import { useState, useEffect } from "react";
import { H1, H2 } from "../../atoms/Headers";

interface StatsData {
  totalMissions: number;
  completedMissions: number;
  ongoingMissions: number;
  totalHBAR: number;
  monthlyHBAR: number;
  totalBuilders: number;
  totalApps: number;
  activeUsers: number;
  missionSuccessRate: number;
  averageMissionTime: number;
  monthlyGrowth: number;
}

interface MonthlyData {
  month: string;
  missions: number;
  revenue: number;
  users: number;
}

const fakeStats: StatsData = {
  totalMissions: 1247,
  completedMissions: 983,
  ongoingMissions: 264,
  totalHBAR: 45890,
  monthlyHBAR: 3240,
  totalBuilders: 156,
  totalApps: 42,
  activeUsers: 89,
  missionSuccessRate: 78.5,
  averageMissionTime: 3.2,
  monthlyGrowth: 12.4,
};

const fakeMonthlyData: MonthlyData[] = [
  { month: "Jan", missions: 120, revenue: 3200, users: 45 },
  { month: "Feb", missions: 145, revenue: 3800, users: 52 },
  { month: "Mar", missions: 165, revenue: 4200, users: 58 },
  { month: "Apr", missions: 190, revenue: 4800, users: 65 },
  { month: "May", missions: 210, revenue: 5200, users: 72 },
  { month: "Jun", missions: 245, revenue: 6100, users: 81 },
  { month: "Jul", missions: 264, revenue: 6800, users: 89 },
];

const StatCard = ({
  title,
  value,
  subtitle,
  trend,
  icon,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: number;
  icon: string;
}) => (
  <div
    className="p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg"
    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
  >
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
        {subtitle && <p className="text-gray-400 text-sm mt-1">{subtitle}</p>}
      </div>
      <div className="text-2xl">{icon}</div>
    </div>
    {trend !== undefined && (
      <div
        className={`flex items-center text-sm ${
          trend >= 0 ? "text-green-400" : "text-red-400"
        }`}
      >
        <span>{trend >= 0 ? "↗" : "↘"}</span>
        <span className="ml-1">{Math.abs(trend)}% from last month</span>
      </div>
    )}
  </div>
);

const ProgressBar = ({
  percentage,
  color,
}: {
  percentage: number;
  color: string;
}) => (
  <div className="w-full bg-gray-700 rounded-full h-3">
    <div
      className="h-3 rounded-full transition-all duration-500"
      style={{
        width: `${percentage}%`,
        background: color,
      }}
    />
  </div>
);

const SimpleBarChart = ({
  data,
  title,
}: {
  data: MonthlyData[];
  title: string;
}) => {
  const maxValue = Math.max(...data.map((d) => d.missions));

  return (
    <div
      className="p-6 rounded-lg border border-gray-700"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div className="flex items-end justify-between h-60 gap-2">
        {data.map((item) => {
          const barHeight = (item.missions / maxValue) * 80;
          return (
            <div key={item.month} className="flex flex-col items-center flex-1">
              <div className="h-32 flex items-end">
                <div
                  className="w-8 bg-gradient-to-t from-purple-600 to-blue-600 rounded-t transition-all duration-500 hover:from-purple-500 hover:to-blue-500"
                  style={{ height: `${barHeight}%` }}
                />
              </div>
              <span className="text-xs text-gray-400 mt-2">{item.month}</span>
              <span className="text-xs text-purple-400 font-semibold">
                {item.missions}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const StatsDashboard = () => {
  const [stats, setStats] = useState<StatsData>(fakeStats);
  const [monthlyData, setMonthlyData] =
    useState<MonthlyData[]>(fakeMonthlyData);
  const [timeRange, setTimeRange] = useState<string>("6m");

  useEffect(() => {
    setStats(fakeStats);
    setMonthlyData(fakeMonthlyData);
  }, []);

  const completionRate = (stats.completedMissions / stats.totalMissions) * 100;

  return (
    <div className="w-full p-6 max-h-[86vh] overflow-y-auto">
      <H1 className="mb-8 mx-0 lg:text-left text-4xl">
        📊 Platform Statistics
      </H1>

      <div className="flex gap-2 mb-6">
        {["1m", "3m", "6m", "1y", "all"].map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-4 py-2 rounded-lg border transition-all ${
              timeRange === range
                ? "bg-purple-600 border-purple-500 text-white"
                : "bg-gray-800 border-gray-600 text-gray-300 hover:border-purple-500"
            }`}
          >
            {range.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Missions"
          value={stats.totalMissions.toLocaleString()}
          subtitle={`${stats.ongoingMissions} in progress`}
          trend={8.2}
          icon="🚀"
        />
        <StatCard
          title="Total HBAR Distributed"
          value={stats.totalHBAR.toLocaleString()}
          subtitle={`${stats.monthlyHBAR} this month`}
          trend={15.7}
          icon="💰"
        />
        <StatCard
          title="Builders Community"
          value={stats.totalBuilders}
          subtitle={`${stats.activeUsers} active`}
          trend={12.4}
          icon="👥"
        />
        <StatCard
          title="Applications"
          value={stats.totalApps}
          subtitle="Integrated apps"
          trend={5.3}
          icon="📱"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div
          className="p-6 rounded-lg border border-gray-700"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <H2 className="mb-6 mt-0 text-2xl font-semibold">
            📈 Mission Analytics
          </H2>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">Completion Rate</span>
                <span className="text-purple-400 font-semibold">
                  {stats.missionSuccessRate}%
                </span>
              </div>
              <ProgressBar
                percentage={stats.missionSuccessRate}
                color="linear-gradient(to right, #8B5CF6, #3B82F6)"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">Mission Status</span>
                <span className="text-gray-400">
                  {stats.completedMissions} completed • {stats.ongoingMissions}{" "}
                  ongoing
                </span>
              </div>
              <div className="flex h-3 rounded-full overflow-hidden">
                <div
                  className="bg-green-500 transition-all duration-500"
                  style={{ width: `${completionRate}%` }}
                />
                <div
                  className="bg-blue-500 transition-all duration-500"
                  style={{ width: `${100 - completionRate}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded border border-green-500">
                <p className="text-2xl font-bold text-green-400">
                  {stats.completedMissions}
                </p>
                <p className="text-sm text-gray-300">Completed</p>
              </div>
              <div className="text-center p-4 rounded border border-blue-500">
                <p className="text-2xl font-bold text-blue-400">
                  {stats.ongoingMissions}
                </p>
                <p className="text-sm text-gray-300">In Progress</p>
              </div>
            </div>

            <div className="text-center p-4 rounded border border-purple-500">
              <p className="text-lg font-bold text-purple-400">
                ⏱️ Average Mission Time: {stats.averageMissionTime} days
              </p>
            </div>
          </div>
        </div>

        <div
          className="p-6 rounded-lg border border-gray-700"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <H2 className="mb-6 mt-0 text-2xl font-semibold">
            💸 Financial Overview
          </H2>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded border border-yellow-500">
                <p className="text-2xl font-bold text-yellow-400">
                  {stats.totalHBAR.toLocaleString()}
                </p>
                <p className="text-sm text-gray-300">Total HBAR</p>
                <p className="text-xs text-green-400 mt-1">All Time</p>
              </div>
              <div className="text-center p-4 rounded border border-green-500">
                <p className="text-2xl font-bold text-green-400">
                  {stats.monthlyHBAR.toLocaleString()}
                </p>
                <p className="text-sm text-gray-300">Monthly HBAR</p>
                <p className="text-xs text-blue-400 mt-1">Current Month</p>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">Monthly Growth</span>
                <span className="text-green-400 font-semibold">
                  +{stats.monthlyGrowth}%
                </span>
              </div>
              <ProgressBar
                percentage={stats.monthlyGrowth}
                color="linear-gradient(to right, #10B981, #3B82F6)"
              />
            </div>

            <div className="text-center p-4 rounded border border-blue-500">
              <p className="text-lg font-bold text-blue-400">
                💰 Average Payout:{" "}
                {Math.round(stats.totalHBAR / stats.completedMissions)}{" "}
                HBAR/mission
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <SimpleBarChart data={monthlyData} title="Missions Per Month" />

        <div
          className="p-6 rounded-lg border border-gray-700"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <h3 className="text-lg font-semibold text-white mb-4">
            📊 Platform Growth
          </h3>
          <div className="space-y-4">
            {monthlyData.map((month) => (
              <div key={month.month}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{month.month}</span>
                  <span className="text-purple-400">{month.users} users</span>
                </div>
                <ProgressBar
                  percentage={
                    (month.users /
                      Math.max(...monthlyData.map((m) => m.users))) *
                    100
                  }
                  color="linear-gradient(to right, #EC4899, #8B5CF6)"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className="p-6 rounded-lg border border-green-500 text-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="text-3xl mb-2">🏆</div>
          <p className="text-xl font-bold text-green-400">Top Builder</p>
          <p className="text-gray-300">@CryptoMaster</p>
          <p className="text-sm text-gray-400">1,240 HBAR earned</p>
        </div>

        <div
          className="p-6 rounded-lg border border-blue-500 text-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="text-3xl mb-2">⚡</div>
          <p className="text-xl font-bold text-blue-400">Fastest Mission</p>
          <p className="text-gray-300">12 hours</p>
          <p className="text-sm text-gray-400">UI Design Task</p>
        </div>

        <div
          className="p-6 rounded-lg border border-purple-500 text-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="text-3xl mb-2">🌟</div>
          <p className="text-xl font-bold text-purple-400">Most Active App</p>
          <p className="text-gray-300">DeFi Platform</p>
          <p className="text-sm text-gray-400">86 missions completed</p>
        </div>
      </div>

      <div
        className="mt-8 p-6 rounded-lg border border-gray-700"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <H2 className="mb-4 text-2xl font-semibold">📋 Platform Summary</H2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-purple-400">
              {stats.totalMissions}
            </p>
            <p className="text-sm text-gray-300">Total Missions</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-400">
              {stats.totalHBAR.toLocaleString()}+
            </p>
            <p className="text-sm text-gray-300">HBAR Distributed</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-400">
              {stats.totalBuilders}
            </p>
            <p className="text-sm text-gray-300">Builders</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-yellow-400">
              {stats.totalApps}
            </p>
            <p className="text-sm text-gray-300">Applications</p>
          </div>
        </div>
        <div className="mt-4 p-4 rounded border border-blue-500 bg-blue-500/10">
          <p className="text-blue-400 text-center">
            🎯 <strong>Platform Health:</strong> Excellent •{" "}
            <strong>Growth:</strong> +{stats.monthlyGrowth}% this month
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;
