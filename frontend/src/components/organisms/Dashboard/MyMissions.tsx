import { useEffect, useState } from "react";
import Button from "../../atoms/Button";
import type {
  MissionQuery,
  CreateNewMission,
} from "../../../types/mission-types";
import MissionForm from "../../molecules/form/MissionForm";
import { Modal } from "antd";
import {
  createNewMission,
  getMissionForBuilder,
  getMissionForHederaApp,
  updateMission,
  deleteMission,
} from "../../../api/mission";
import { selectHederaApp } from "../../../redux/hederaApp/hederaAppReducer";
import { useSelector } from "react-redux";
import { H1, H2 } from "../../atoms/Headers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPen,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { selectBuilder } from "../../../redux/builder/builderReducer";
import { listSubmissions } from "../../../api/submission";
import type { SubmissionQuery } from "../../../types/submission-types";
import SubmissionModal from "../../molecules/Modals/SubmissionModal";
import { getHederaAppByScId } from "../../../api/hederaApp";
import type { HederaAppQuery } from "../../../types/hederaApp-types";
import MissionDetail from "../Mission/MissionDetail";

type MissionWithSubmission = MissionQuery & {
  submissionCount?: number;
  submission?: SubmissionQuery[];
  appInfo?: HederaAppQuery;
};

const MyMissions = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedMission, setSelectedMission] =
    useState<MissionWithSubmission | null>(null);
  const [selectedMissionId, setSelectedMissionId] = useState<string | null>(
    null
  );
  const [missions, setMissions] = useState<MissionWithSubmission[] | null>(
    null
  );
  const [openSubModal, setOpenSubModal] = useState(false);
  const [selectedSubMission, setSelectedSubMission] =
    useState<MissionQuery | null>(null);
  const app = useSelector(selectHederaApp);
  const builder = useSelector(selectBuilder);
  const isBuilder =
    !app?.infos?.smartcontract_id && !!builder?.infos?.smartcontract_id;
  const context = isBuilder ? builder : app;

  const handleOpenAdd = () => {
    setSelectedMission(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (mission: MissionQuery) => {
    setSelectedMission(mission);
    setModalOpen(true);
  };

  const handleSubmit = async (mission: CreateNewMission) => {
    try {
      const token = await localStorage.getItem(
        import.meta.env.VITE_LS_TOKEN_KEY
      );
      if (token !== null) {
        if (selectedMission) {
          const updatedMission = await updateMission({
            token,
            id: selectedMission._id,
            data: mission,
          });
          if (updatedMission.status === 200) {
            setModalOpen(false);
            setSelectedMission(null);
            getMissions();
          }
        } else {
          const newMission = await createNewMission({ token, data: mission });
          if (newMission.status === 200) {
            setModalOpen(false);
            setSelectedMission(null);
            getMissions();
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (missionId: string) => {
    try {
      const token = await localStorage.getItem(
        import.meta.env.VITE_LS_TOKEN_KEY
      );
      if (token) {
        await deleteMission({ token, id: missionId });
        getMissions();
      }
    } catch (err) {
      console.error("Failed to delete mission:", err);
    }
  };

  const getMissions = async () => {
    try {
      const token = await localStorage.getItem(
        import.meta.env.VITE_LS_TOKEN_KEY
      );
      if (!token) return;

      const res = isBuilder
        ? await getMissionForBuilder({
            token,
            id: context.infos.smartcontract_id,
          })
        : await getMissionForHederaApp({
            token,
            id: context.infos.smartcontract_id,
          });

      if (res.status !== 200) {
        setMissions([]);
        return;
      }

      const enrichedMissions = res.content.mission;

      const missionsWithAppInfo = await Promise.all(
        enrichedMissions.map(async (mission: MissionQuery) => {
          if (!mission.app_id) return mission;

          try {
            const appRes = await getHederaAppByScId(token, mission.app_id);
            if (appRes.status === 200) {
              return {
                ...mission,
                appInfo: appRes.content.app,
              };
            }
            return mission;
          } catch {
            return mission;
          }
        })
      );

      if (!isBuilder) {
        const submissionsRes = await listSubmissions({ token });
        const allSubmissions =
          submissionsRes.status === 200
            ? submissionsRes.content.submissions
            : [];

        const missionsFinal = missionsWithAppInfo.map(
          (mission: MissionQuery) => {
            const submission = allSubmissions.filter(
              (s: SubmissionQuery) => s.mission_id === mission._id
            );
            return {
              ...mission,
              submissionCount: submission.length,
              submission: submission,
            };
          }
        );

        setMissions(missionsFinal);
      } else {
        setMissions(missionsWithAppInfo);
      }
    } catch {
      setMissions([]);
    }
  };

  useEffect(() => {
    getMissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (selectedMissionId !== null) {
    return (
      <MissionDetail
        missionId={selectedMissionId}
        onBack={() => setSelectedMissionId(null)}
      />
    );
  }
  return (
    <div className="w-full p-6 pt-2 max-h-[86vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <H1 className="mx-0">My Missions</H1>
        {!isBuilder && (
          <Button onClick={handleOpenAdd} className="p-2">
            Add Mission
          </Button>
        )}
      </div>

      {missions &&
        (isBuilder
          ? ["Ongoing", "Finished", "Canceled"]
          : ["Pending", "Ongoing", "Finished", "Canceled"]
        ).map((status) => {
          const filtered = missions.filter((m) => m.status === status);

          if (isBuilder) {
            const builderMissions = filtered.filter(
              (m) => m.builder_id === builder?.infos.smartcontract_id
            );
            if (builderMissions.length === 0) return null;

            return (
              <div key={status} className="mb-8">
                <h3 className="text-lg text-indigo-400 font-semibold mb-2">
                  {status} Missions
                </h3>
                <ul className="flex flex-wrap gap-4">
                  {builderMissions.map((mission, index) => (
                    <li
                      key={index}
                      className="p-4 bg-black/50 rounded-md shadow-md w-full sm:w-64 flex flex-col justify-between min-h-48 relative border border-indigo-500/30 hover:border-indigo-400/60 hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] transition-all duration-300"
                    >
                      <div>
                        <div className="w-full aspect-square mb-4 rounded-md overflow-hidden border-2 border-indigo-600">
                          <img
                            src={`/avatars/${mission.appInfo?.avatar}`}
                            alt="Selected avatar"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <H2 className="mb-4 mt-0 text-xl uppercase text-left text-indigo-400">
                          {mission.title}
                        </H2>
                        <p className="text-sm text-gray-300 mb-4">
                          <strong>Description:</strong>{" "}
                          {mission.description.length > 60
                            ? `${mission.description.substring(0, 60)}...`
                            : mission.description}
                        </p>
                        <p className="text-sm text-gray-300">
                          Reward: {mission.reward} HBAR
                        </p>
                      </div>

                      {mission.status === "Canceled" ? (
                        <div className="mt-auto pt-4">
                          <p className="text-red-500 font-semibold text-sm">
                            Cancellation pending
                          </p>
                        </div>
                      ) : (
                        <div className="mt-auto pt-4 flex justify-end">
                          <Button
                            onClick={() => setSelectedMissionId?.(mission._id)}
                            className="pt-1 hover:text-blue-600"
                            title="View"
                          >
                            <FontAwesomeIcon icon={faEye} />
                          </Button>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          } else {
            if (filtered.length === 0) return null;

            return (
              <div key={status} className="mb-8">
                <h3 className="text-lg text-indigo-400 font-semibold mb-2">
                  {status} Missions
                </h3>
                <ul className="flex flex-wrap gap-4">
                  {filtered.map((mission, index) => (
                    <li
                      key={index}
                      className="p-4 bg-black/50 rounded-md shadow-md w-full sm:w-64 flex flex-col justify-between min-h-48 relative border border-indigo-500/30 hover:border-indigo-400/60 hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] transition-all duration-300"
                    >
                      <div>
                        <div className="w-full aspect-square mb-4 rounded-md overflow-hidden border-2 border-indigo-600">
                          <img
                            src={`/avatars/${mission.appInfo?.avatar}`}
                            alt="Selected avatar"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <H2 className="mb-4 mt-0 text-xl uppercase text-left text-indigo-400">
                          {mission.title}
                        </H2>
                        <p className="text-sm text-gray-300 mb-4">
                          <strong>Description:</strong>{" "}
                          {mission.description.length > 60
                            ? `${mission.description.substring(0, 60)}...`
                            : mission.description}
                        </p>
                        <p className="text-sm text-gray-300">
                          Reward: {mission.reward} HBAR
                        </p>
                      </div>

                      {mission.status === "Canceled" ? (
                        <div className="mt-auto pt-4">
                          <p className="text-red-500 font-semibold text-sm">
                            Cancellation pending
                          </p>
                        </div>
                      ) : (
                        <div
                          className={`mt-auto pt-4 flex justify-end gap-2 ${
                            mission.status !== "Pending" ? "items-center" : ""
                          }`}
                        >
                          <Button
                            onClick={() => setSelectedMissionId?.(mission._id)}
                            className="pt-1 hover:text-blue-600"
                            title="View"
                          >
                            <FontAwesomeIcon icon={faEye} />
                          </Button>

                          {!isBuilder && mission.builder_id === null ? (
                            <>
                              <Button
                                onClick={() => handleOpenEdit(mission)}
                                className="pt-1 hover:text-blue-600"
                                title="Edit"
                              >
                                <FontAwesomeIcon icon={faPen} />
                              </Button>
                              {mission.submissionCount !== undefined && (
                                <Button
                                  className="pt-1 hover:text-blue-600 text-xs"
                                  onClick={() => {
                                    setSelectedSubMission(mission);
                                    setOpenSubModal(true);
                                  }}
                                  title="Submission"
                                >
                                  <FontAwesomeIcon icon={faUser} />
                                  {mission.submissionCount}
                                </Button>
                              )}
                              <Button
                                onClick={() => handleDelete(mission._id)}
                                title="Delete"
                                className="pt-1 hover:text-blue-600"
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </Button>
                            </>
                          ) : (
                            <p
                              className={`${
                                mission.status === "Ongoing"
                                  ? "text-yellow-500"
                                  : "text-green-500"
                              }`}
                            >
                              Mission{" "}
                              {mission.status === "Ongoing"
                                ? "on going"
                                : "finished"}
                            </p>
                          )}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          }
        })}

      {isBuilder === false && (
        <Modal
          title={selectedMission ? "Edit Mission" : "New Mission"}
          open={isModalOpen}
          onCancel={() => {
            setModalOpen(false);
            setSelectedMission(null);
          }}
          footer={null}
          centered
          destroyOnClose
        >
          <MissionForm
            initialData={selectedMission || undefined}
            onSubmit={handleSubmit}
            appId={app.infos.smartcontract_id}
          />
        </Modal>
      )}
      {selectedSubMission && (
        <SubmissionModal
          open={openSubModal}
          onCancel={() => {
            setOpenSubModal(false);
            setSelectedSubMission(null);
          }}
          mission={selectedSubMission}
          uploadMission={() => {
            getMissions();
            setOpenSubModal(false);
            setSelectedSubMission(null);
          }}
        />
      )}
    </div>
  );
};

export default MyMissions;
