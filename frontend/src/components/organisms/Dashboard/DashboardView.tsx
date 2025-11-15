import { useEffect, useState } from "react";
import { H1, H2 } from "../../atoms/Headers";
import { selectHederaApp } from "../../../redux/hederaApp/hederaAppReducer";
import { useSelector } from "react-redux";
import { selectBuilder } from "../../../redux/builder/builderReducer";

export interface BuilderQuery {
  _id: string;
  firstname: string;
  lastname: string;
  nickname: string;
  wallet_id: string;
  smartcontract_id: string;
  created_at: number;
  last_login: number;
  level: string;
  avatar?: string | null;
  score: number;
}

const fakeTopBuilders: BuilderQuery[] = [
  {
    _id: "1",
    firstname: "Alice",
    lastname: "Dupont",
    nickname: "AliceD",
    wallet_id: "0x123",
    smartcontract_id: "sc-1",
    created_at: 1670000000000,
    last_login: Date.now(),
    level: "Expert",
    avatar: null,
    score: 980,
  },
  {
    _id: "2",
    firstname: "Bob",
    lastname: "Martin",
    nickname: "BobM",
    wallet_id: "0x456",
    smartcontract_id: "sc-2",
    created_at: 1670000000000,
    last_login: Date.now(),
    level: "Advanced",
    avatar: null,
    score: 950,
  },
  {
    _id: "3",
    firstname: "Charlie",
    lastname: "Durand",
    nickname: "CharlieD",
    wallet_id: "0x789",
    smartcontract_id: "sc-3",
    created_at: 1670000000000,
    last_login: Date.now(),
    level: "Intermediate",
    avatar: null,
    score: 910,
  },
  {
    _id: "4",
    firstname: "Diana",
    lastname: "Lemoine",
    nickname: "DianaL",
    wallet_id: "0x999",
    smartcontract_id: "sc-4",
    created_at: 1670000000000,
    last_login: Date.now(),
    level: "Beginner",
    avatar: null,
    score: 890,
  },
];

function calculateProgress(score: number): number {
  const levelMaxScore = 1000;
  return Math.min(100, ((score % levelMaxScore) / levelMaxScore) * 100);
}

const DashboardView = () => {
  const [topBuilders, setTopBuilders] = useState<BuilderQuery[]>([]);
  const app = useSelector(selectHederaApp);
  const builder = useSelector(selectBuilder);
  useEffect(() => {
    setTopBuilders(fakeTopBuilders);
  }, []);

  const getMedal = (rank: number) => {
    switch (rank) {
      case 0:
        return <span className="text-3xl">🥇</span>;
      case 1:
        return <span className="text-3xl">🥈</span>;
      case 2:
        return <span className="text-3xl">🥉</span>;
      default:
        return null;
    }
  };

  const handleCardClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const score = app?.infos?.score ?? builder?.infos?.score ?? 0;
  const progress = Math.round(calculateProgress(score));
  return (
    <div className="w-full p-6 max-h-[86vh] overflow-y-auto">
      <H1 className="mb-8 mx-0 lg:text-left text-4xl">Dashboard</H1>
      <div className="flex flex-col lg:flex-row md:gap-4">
        <section
          className="mb-12 p-6 rounded-md shadow-sm w-full md:w-[300px] flex-shrink-0"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <H2 className="mb-4 mt-0 md:text-left text-2xl font-semibold">
            My level
          </H2>
          <div className="flex items-center gap-4 mb-4">
            {app?.infos?.avatar || builder?.infos?.avatar ? (
              <img
                src={`/avatars/${app?.infos?.avatar || builder?.infos?.avatar}`}
                alt="avatar"
                className="w-24 h-24 rounded object-cover border-2"
                style={{
                  borderColor: "#00fff7",
                  boxShadow: "0 0 10px #00fff7",
                }}
              />
            ) : (
              <div
                className="flex items-center justify-center w-24 h-24 rounded border-2 text-2xl font-bold"
                style={{
                  borderColor: "#8a2be2",
                  boxShadow: "0 0 10px #00fff7",
                  backgroundColor: "#330066",
                  color: "#8a2be2",
                }}
              >
                {app?.infos?.app_name?.[0] ||
                  builder?.infos?.nickname?.[0] ||
                  "?"}
              </div>
            )}
            <div>
              <p className="text-xl font-bold text-indigo-400">
                {app?.infos?.app_name || builder?.infos?.nickname || "?"}
              </p>
              <p className="text-sm">
                {app?.infos?.app_twitter ??
                  `${builder?.infos?.firstname ?? ""} ${
                    builder?.infos?.lastname ?? ""
                  }`.trim()}
              </p>
            </div>
          </div>

          <p className="mb-1">
            <strong className="text-indigo-400">Score:</strong>{" "}
            {app?.infos?.score ?? builder?.infos?.score ?? "N/A"}
          </p>
          <p className="mb-3">
            <strong className="text-indigo-400">Level:</strong>{" "}
            {app?.infos?.level ?? builder?.infos?.level ?? "N/A"}
          </p>

          <div
            className="w-full h-5 rounded-md border border-white/50 overflow-hidden"
            style={{ backgroundColor: "#330066" }}
          >
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(to right, #8a2be2, #00fff7)",
              }}
            />
          </div>
          <p className="mt-1 text-xs italic text-indigo-400 text-center">
            {progress}% to the next level
          </p>
        </section>

        <section className="w-full">
          <div
            className="rounded-md shadow-sm p-6"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <H2 className="mt-0 mb-4 text-2xl lg:text-left font-semibold">
              Top 10 Builders
            </H2>

            <ul className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
              {topBuilders.map((b, i) => (
                <li
                  key={b._id}
                  className="relative overflow-hidden flex flex-col justify-between p-4 w-full sm:w-[48%] lg:w-64 rounded-md shadow-md hover:shadow-[0_0_16px_#8a2be2] transition-all duration-300"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.5)",
                    cursor: "pointer",
                    border: "1px solid rgba(138, 43, 226, 0.3)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    {getMedal(i) ? (
                      getMedal(i)
                    ) : (
                      <span className="text-xl font-extrabold text-[#8a2be2]">
                        {i + 1}.
                      </span>
                    )}
                    {builder.avatar ? (
                      <img
                        src={`/avatars/${b.avatar}`}
                        alt="avatar"
                        className="w-12 h-12 rounded-full object-cover border-2"
                        style={{
                          borderColor: "#00fff7",
                          boxShadow: "0 0 8px #00fff7",
                        }}
                      />
                    ) : (
                      <div
                        className="flex items-center justify-center w-12 h-12 text-lg font-bold rounded-full"
                        style={{
                          borderColor: "#8a2be2",
                          boxShadow: "0 0 8px #00fff7",
                          backgroundColor: "#330066",
                          color: "#8a2be2",
                          borderStyle: "solid",
                          borderWidth: 2,
                        }}
                      >
                        {b.firstname[0]}
                        {b.lastname[0]}
                      </div>
                    )}

                    <span className="uppercase font-semibold">
                      {b.nickname}
                    </span>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm text-indigo-400 font-semibold">
                      Score: {b.score}
                    </p>
                    <p className="text-xs italic">Niveau: {b.level}</p>
                  </div>

                  <div
                    className="w-full h-4 rounded-md border border-white/50 overflow-hidden"
                    style={{
                      backgroundColor: "#330066",
                    }}
                  >
                    <div
                      className="h-full transition-all duration-500"
                      style={{
                        width: `${calculateProgress(b.score)}%`,
                        background:
                          "linear-gradient(to right, #8a2be2, #00fff7)",
                      }}
                    />
                  </div>
                  <p className="mt-1 text-xs italic text-center text-indigo-400">
                    {Math.round(calculateProgress(b.score))}% vers le niveau
                    suivant
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <H2 className="mt-8 mb-6 text-2xl lg:text-left font-semibold">
                Resources & Community
              </H2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                  className="relative overflow-hidden rounded-md shadow-md hover:shadow-[0_0_16px_#8a2be2] transition-all duration-300 cursor-pointer group"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.5)",
                    border: "1px solid rgba(138, 43, 226, 0.3)",
                    minHeight: "200px",
                  }}
                  onClick={() => handleCardClick("https://hedera.com/blog")}
                >
                  <div
                    className="w-full h-32 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://images.hedera.com/HH_Meta_Blog.png?w=800&h=418&q=82&auto=format&fit=clip&dm=1709008264&s=3353fe529323cc9ccc70fef8c10cacf2')",
                      backgroundSize: "cover",
                    }}
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-indigo-400 mb-2">
                      Hedera Blog
                    </h3>
                    <p className="text-sm text-gray-300">
                      Follow the latest news and updates from the Hedera
                      ecosystem
                    </p>
                  </div>
                </div>

                <div
                  className="relative overflow-hidden rounded-md shadow-md hover:shadow-[0_0_16px_#8a2be2] transition-all duration-300 cursor-pointer group"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.5)",
                    border: "1px solid rgba(138, 43, 226, 0.3)",
                    minHeight: "200px",
                  }}
                  onClick={() => handleCardClick("https://academy.kabila.app/")}
                >
                  <div
                    className="w-full h-32 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCMQhdfOo7pNDGebVZykrARiK-gnsPrPI_PQ&s')",
                      backgroundSize: "cover",
                    }}
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-indigo-400 mb-2">
                      Kabila Academy
                    </h3>
                    <p className="text-sm text-gray-300">
                      Discover the Kabila academy - Learn and develop your
                      skills
                    </p>
                  </div>
                </div>

                <div
                  className="relative overflow-hidden rounded-md shadow-md hover:shadow-[0_0_16px_#8a2be2] transition-all duration-300 cursor-pointer group"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.5)",
                    border: "1px solid rgba(138, 43, 226, 0.3)",
                    minHeight: "200px",
                  }}
                  onClick={() => handleCardClick("https://x.com/HederaKimchi")}
                >
                  <div
                    className="w-full h-32 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://pbs.twimg.com/profile_banners/164099066/1751298416/1500x500')",
                      backgroundSize: "cover",
                    }}
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-indigo-400 mb-2">
                      X Account of the Month
                    </h3>
                    <p className="text-sm text-gray-300 mb-2">@HederaKimchi</p>
                    <p className="text-xs text-gray-400">
                      Discover the Hedera community's X account to follow this
                      month
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardView;
