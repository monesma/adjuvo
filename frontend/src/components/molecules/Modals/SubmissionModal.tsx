import { useEffect, useState } from "react";
import Modal from "../../atoms/Modal/Modal";
import Button from "../../atoms/Button";
import { H2 } from "../../atoms/Headers";
import type { MissionQuery } from "../../../types/mission-types";
import type { SubmissionQuery } from "../../../types/submission-types";
import type { BuilderQuery } from "../../../types/builder-types";
import { getBuilderByScId } from "../../../api/builder";
import { updateMission } from "../../../api/mission";
import { createNewNotification } from "../../../api/notification";
import { deleteSubmission } from "../../../api/submission";

type Props = {
  open: boolean;
  onCancel: () => void;
  mission: MissionQuery & { submission?: SubmissionQuery[] };
  uploadMission: () => void;
};

type BuilderWithMissionFinished = BuilderQuery & {
  missionFinished?: number;
};

type SubmissionWithBuilder = SubmissionQuery & {
  builder?: BuilderWithMissionFinished;
};

const SubmissionModal = ({ open, onCancel, mission, uploadMission }: Props) => {
  const [submissions, setSubmissions] = useState<SubmissionWithBuilder[]>([]);

  const handleSelectBuilder = async (builderId: string) => {
    try {
      const token = await localStorage.getItem(
        import.meta.env.VITE_LS_TOKEN_KEY
      );
      if (!token) return;
      const data = {
        app_id: mission.app_id,
        builder_id: builderId,
        title: mission.title,
        description: mission.description,
        reward: mission.reward,
        currency: mission.currency,
        status: "Ongoing",
      };
      const updateMyMission = await updateMission({
        token,
        id: mission._id,
        data,
      });
      if (updateMyMission.status === 200) {
        const data2 = {
          app_id: mission.app_id,
          builder_id: builderId,
          title: "Congratulation",
          description: `You are selected for the mission: ${mission.title}.`,
          status: "Pending",
          who: "builder",
          creation_date: Date.now(),
        };

        const notif = await createNewNotification({ token, data: data2 });
        if (notif.status === 200) {
          await Promise.all(
            await submissions.map(async (sub) => {
              try {
                if (sub._id) {
                  await deleteSubmission({ token, id: sub._id });
                }
                if (sub.builder_id && sub.builder_id !== builderId) {
                  const refusalNotif = {
                    app_id: mission.app_id,
                    builder_id: sub.builder_id,
                    title: "Sorry",
                    description: `Your submission for mission "${mission.title}" was not selected.`,
                    who: "builder",
                    status: "Pending",
                    who: "builder",
                    creation_date: Date.now(),
                  };
                  await createNewNotification({ token, data: refusalNotif });
                }
              } catch {
                console.log(
                  "Failed to delete submission or send refusal notification"
                );
              }
            })
          );
          uploadMission();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchBuilders = async () => {
      if (!mission?.submission || mission.submission.length === 0) {
        setSubmissions([]);
        return;
      }

      const token = await localStorage.getItem(
        import.meta.env.VITE_LS_TOKEN_KEY
      );
      if (!token) return;

      const withBuilders = await Promise.all(
        mission.submission.map(async (sub): Promise<SubmissionWithBuilder> => {
          if (!sub.builder_id) return { ...sub };

          try {
            const res = await getBuilderByScId(token, sub.builder_id);

            if (res.status === 200) {
              return {
                ...sub,
                builder: res.content.builder,
              };
            }
          } catch {
            console.error("Failed to fetch builder", sub.builder_id);
          }

          return { ...sub };
        })
      );

      setSubmissions(withBuilders);
    };

    if (open) fetchBuilders();
  }, [open, mission]);

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title="Mission Submissions"
      footer={null}
    >
      <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-2">
        <H2 className="text-indigo-400 mt-0 text-md mb-4">
          Submissions for: {mission.title}
        </H2>

        {submissions.length === 0 ? (
          <p className="text-sm text-gray-600 text-center">
            No submissions yet.
          </p>
        ) : (
          <ul className="space-y-3">
            {submissions.map((sub) => (
              <li
                key={sub._id}
                className="p-2 border border-indigo-300 rounded-md flex items-center gap-3 bg-white"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden border">
                  <img
                    src={`/avatars/${sub.builder?.avatar ?? "default.png"}`}
                    alt="Builder Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-indigo-700">
                    {sub.builder?.nickname ||
                      `${sub.builder?.firstname ?? ""} ${
                        sub.builder?.lastname ?? ""
                      }`.trim() ||
                      "Unknown Builder"}
                  </p>
                  <p className="text-xs text-gray-600">
                    <strong>Level:</strong> {sub.builder?.level}
                  </p>
                  <p className="text-xs text-gray-600">
                    <strong>Score:</strong> {sub.builder?.score}
                  </p>
                  <p className="text-xs text-gray-600">
                    <strong>Missions completed:</strong>{" "}
                    {sub.builder?.missionFinished ?? 0}
                  </p>
                  <p className="text-xs text-gray-400">
                    Submitted on:{" "}
                    {new Date(sub.creation_timestamp).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right mt-2">
                  <Button
                    onClick={() => handleSelectBuilder(sub.builder_id!)}
                    className="p-2"
                  >
                    Select this Builder
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="text-right pt-2">
          <Button onClick={onCancel}>Close</Button>
        </div>
      </div>
    </Modal>
  );
};

export default SubmissionModal;
