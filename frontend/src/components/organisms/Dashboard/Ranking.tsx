import { useState } from "react";
import { H1, H2 } from "../../atoms/Headers";
import { useSelector } from "react-redux";
import { selectHederaApp } from "../../../redux/hederaApp/hederaAppReducer";
import { selectBuilder } from "../../../redux/builder/builderReducer";

type EntityType = "builder" | "app";

interface RankingEntry {
  _id: string;
  name: string;
  score: number;
  level: string;
  avatar?: string | null;
  type: EntityType;
}

const fakeApps: RankingEntry[] = [
  { _id: "app1", name: "App Alpha", score: 1020, level: "Expert", type: "app" },
  { _id: "app2", name: "App Beta", score: 980, level: "Advanced", type: "app" },
  { _id: "app3", name: "App Gamma", score: 940, level: "Intermediate", type: "app" },
  { _id: "app4", name: "App Delta", score: 900, level: "Beginner", type: "app" },
  { _id: "app5", name: "App Epsilon", score: 860, level: "Beginner", type: "app" },
];

const fakeBuilders: RankingEntry[] = [
  { _id: "builder1", name: "AliceD", score: 990, level: "Expert", type: "builder" },
  { _id: "builder2", name: "BobM", score: 960, level: "Advanced", type: "builder" },
  { _id: "builder3", name: "CharlieD", score: 930, level: "Intermediate", type: "builder" },
  { _id: "builder4", name: "DianaL", score: 910, level: "Beginner", type: "builder" },
  { _id: "builder5", name: "EliotZ", score: 880, level: "Beginner", type: "builder" },
];

const calculateProgress = (score: number) => {
  const levelMaxScore = 1000;
  return Math.min(100, ((score % levelMaxScore) / levelMaxScore) * 100);
};

const getMedal = (rank: number) => {
  switch (rank) {
    case 0:
      return <span className="text-2xl">🥇</span>;
    case 1:
      return <span className="text-2xl">🥈</span>;
    case 2:
      return <span className="text-2xl">🥉</span>;
    default:
      return <span className="text-xl font-bold text-indigo-400">{rank + 1}.</span>;
  }
};

const RankingSection = ({
  title,
  entries,
  currentId,
}: {
  title: string;
  entries: RankingEntry[];
  currentId?: string;
}) => {
  return (
    <div className="rounded-md shadow-sm p-6 bg-black/40 text-white">
      <H2 className="text-2xl font-bold mb-4">{title}</H2>
      {entries.length === 0 ? (
        <p className="italic text-sm text-center text-indigo-300">Aucun résultat</p>
      ) : (
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
          {entries.map((entry, i) => {
            const isCurrent = entry._id === currentId;
            return (
              <li
                key={entry._id}
                className={`relative flex flex-col justify-between p-4 w-full sm:w-[48%] lg:w-64 rounded-md shadow-md transition-all duration-300 ${
                  isCurrent ? "border-indigo-400 shadow-[0_0_16px_#00fff7]" : "border-indigo-200"
                }`}
                style={{
                  backgroundColor: "rgba(0,0,0,0.5)",
                  border: "1px solid rgba(138, 43, 226, 0.3)",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  {getMedal(i)}
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-full text-sm font-semibold bg-[#330066] border border-indigo-500 text-indigo-300"
                  >
                    {entry.name[0]}
                  </div>
                  <span className="uppercase font-semibold">{entry.name}</span>
                </div>

                <p className="text-sm mb-1">Score: {entry.score}</p>
                <p className="text-xs italic mb-2">Level: {entry.level}</p>

                <div className="w-full h-4 rounded border border-white/40 overflow-hidden bg-[#330066]">
                  <div
                    className="h-full transition-all duration-500"
                    style={{
                      width: `${calculateProgress(entry.score)}%`,
                      background: "linear-gradient(to right, #8a2be2, #00fff7)",
                    }}
                  />
                </div>
                <p className="mt-1 text-xs italic text-center text-indigo-300">
                  {Math.round(calculateProgress(entry.score))}% to next level
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

const Ranking = () => {
  const app = useSelector(selectHederaApp);
  const builder = useSelector(selectBuilder);
  const appId = app?.infos?._id;
  const builderId = builder?.infos?._id;

  const [search, setSearch] = useState("");

  const filteredBuilders = fakeBuilders
    .filter((b) => b.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => b.score - a.score);

  const filteredApps = fakeApps
    .filter((a) => a.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => b.score - a.score);

  return (
    <div className="w-full p-6 max-h-[86vh] overflow-y-auto">
      <H1 className="mb-6 text-4xl lg:text-left">Ranking</H1>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Rechercher un builder ou une app..."
          className="w-full lg:w-[500px] p-3 rounded-md border border-white/50 text-white/50 focus:outline-none focus:ring-2 focus:ring-[#8a2be2]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/2">
          <RankingSection
            title="Top Builders"
            entries={filteredBuilders.slice(0, 5)}
            currentId={builderId}
          />
        </div>
        <div className="w-full lg:w-1/2">
          <RankingSection
            title="Top Apps"
            entries={filteredApps.slice(0, 5)}
            currentId={appId}
          />
        </div>
      </div>
    </div>
  );
};

export default Ranking;
