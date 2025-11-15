import DashboardView from "./DashboardView";
import SearchMission from "./SearchMission";
import MyMissions from "./MyMissions";
import Ranking from "./Ranking";
import Stats from "./Stats";
import Shop from "./Shop";
interface Props {
  activeView: string;
  token?: string;
}

const AppContent: React.FC<Props> = ({ activeView }) => {
  switch (activeView) {
    case "dashboard":
      return <DashboardView />;
    case "search":
      return <SearchMission />;
    case "missions":
      return <MyMissions />;
    case "ranking":
      return <Ranking />;
    case "stats":
      return <Stats />;
    case "shop":
      return <Shop />;
    default:
      return <DashboardView />;
  }
};

export default AppContent;
