import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { listMissions } from "../../../api/mission";
import type { MissionQuery } from "../../../types/mission-types";
import { selectBuilder } from "../../../redux/builder/builderReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { H1, H2, H3 } from "../../atoms/Headers";
import Button from "../../atoms/Button";
import type { HederaAppQuery } from "../../../types/hederaApp-types";
import { getHederaAppByScId } from "../../../api/hederaApp";
import MissionDetailsModal from "../../molecules/Modals/MissionDetailsModal";
import {
  createNewSubmission,
  getSubmissionByBuilderId,
} from "../../../api/submission";
import type { SubmissionQuery } from "../../../types/submission-types";
type EnrichedMission = MissionQuery & {
  app: HederaAppQuery;
  isSubmitted: boolean;
};

const SearchMissions = () => {
  const builder = useSelector(selectBuilder);
  const [missions, setMissions] = useState<EnrichedMission[] | null>(null);
  const [search, setSearch] = useState("");
  const [selectedMission, setSelectedMission] =
    useState<EnrichedMission | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchMissions = async () => {
    try {
      const token = await localStorage.getItem(
        import.meta.env.VITE_LS_TOKEN_KEY
      );
      if (!token) return;

      const [missionsRes, submissionsRes] = await Promise.all([
        listMissions({ token }),
        getSubmissionByBuilderId({ token, id: builder.infos.smartcontract_id }),
      ]);
      if (missionsRes.status !== 200) {
        setMissions([]);
        return;
      }

      const pendingMissions: MissionQuery[] =
        missionsRes.content.missions.filter(
          (m: MissionQuery) => m.status === "Pending"
        );
      const submittedMissionIds: string[] =
        submissionsRes?.status === 200 &&
        Array.isArray(submissionsRes?.content?.submission)
          ? submissionsRes.content.submission.map(
              (s: SubmissionQuery) => s.mission_id
            )
          : [];
      const enriched: EnrichedMission[] = await Promise.all(
        pendingMissions.map(async (mission) => {
          const appRes = await getHederaAppByScId(token, mission.app_id);
          const isSubmitted = submittedMissionIds.includes(mission._id);
          return {
            ...mission,
            app:
              appRes.status === 200
                ? appRes.content.app
                : ({} as HederaAppQuery),
            isSubmitted,
          };
        })
      );
      setMissions(enriched);
    } catch {
      setMissions([]);
    }
  };

  const handleAply = async () => {
    try {
      const token = await localStorage.getItem(
        import.meta.env.VITE_LS_TOKEN_KEY
      );
      if (token !== null && selectedMission) {
        const data = {
          app_id: selectedMission?.app_id,
          builder_id: builder.infos.smartcontract_id,
          mission_id: selectedMission._id,
          status: "Pending",
          creation_timestamp: Date.now(),
        };
        const submit = await createNewSubmission({ token, data });
        if (submit.status === 200) {
          fetchMissions();
          setSelectedMission(null);
          setIsModalOpen(false);
        } else {
          setSelectedMission(null);
          setIsModalOpen(false);
        }
      }
    } catch {
      setSelectedMission(null);
      setIsModalOpen(false);
    }
  };

  const filteredMissions = missions?.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchMissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full p-6 max-h-[86vh] overflow-y-auto">
      <div className="mb-4">
        <H1 className="mx-0 mb-2 lg:text-left">Search Missions</H1>
        <input
          type="text"
          placeholder="Search missions..."
          className="w-full lg:w-[30%] px-4 py-2 rounded-md border border-indigo-400 bg-black/30 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {!filteredMissions || filteredMissions.length === 0 ? (
        <p className="text-gray-400">No pending missions found.</p>
      ) : (
        <ul className="flex flex-wrap gap-4">
          {filteredMissions.map((mission, index) => (
            <li
              key={index}
              className="p-4 bg-black/50 rounded-md shadow-md w-64 flex flex-col justify-between min-h-48 relative border border-indigo-500/30 hover:border-indigo-400/60 hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] transition-all duration-300"
            >
              <div>
                <div className="w-full aspect-square mb-2 rounded-md overflow-hidden border-2 border-indigo-600">
                  <img
                    src={`/avatars/${mission.app.avatar}`}
                    alt="App avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <H2 className="mb-2 mt-0 text-xl uppercase text-left text-indigo-400">
                  {mission.title}
                </H2>
                <p className="text-xs text-gray-300 mb-2">
                  Description: {mission.description}
                </p>
                <p className="text-xs text-gray-300 mb-2">
                  Reward: {mission.reward} HBAR
                </p>
              </div>
              <div className="border border-white/50 rounded-sm p-1">
                <H3 className="text-sm text-left text-indigo-400 mb-2 mt-0">
                  App info
                </H3>
                <p className="text-xs text-gray-300 font-bold mb-1">
                  {mission.app.app_name}
                </p>
                <p className="text-xs text-gray-300 mb-1">
                  <a
                    href={`${mission.app.app_twitter}`}
                    target="_blank"
                    className="underline text-indigo-400"
                  >
                    {mission.app.app_twitter}
                  </a>
                </p>
                <p className="text-xs text-gray-300 mb-1">
                  <strong>Level:</strong> {mission.app.level}
                </p>
                <p className="text-xs text-gray-300">
                  <strong>Score:</strong> {mission.app.score}
                </p>
              </div>
              <div className="pt-1 flex justify-end">
                {mission.isSubmitted ? (
                  <p className="text-green-400 text-sm font-semibold pt-5">
                    Submitted
                  </p>
                ) : (
                  <Button
                    onClick={() => {
                      setSelectedMission(mission);
                      setIsModalOpen(true);
                    }}
                    className="mx-0 pt-1 hover:text-blue-600 mb-0"
                    title="View"
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
      <MissionDetailsModal
        open={isModalOpen}
        onCancel={() => {
          setSelectedMission(null);
          setIsModalOpen(false);
        }}
        mission={selectedMission}
        app={selectedMission?.app || null}
        onApply={handleAply}
      />
    </div>
  );
};

export default SearchMissions;
