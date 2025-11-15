import DashboardView from "./DashboardView";
import SearchMission from "./SearchMission";
import MyMissions from "./MyMissions";
import Ranking from "./Ranking";
import Stats from "./Stats";
import Shop from "./Shop";
interface Props {
  activeView: string;
}

const AppContent: React.FC<Props> = ({ activeView }) => {

  switch (activeView) {
    case "dashboard":
      return <div className="flex-1 overflow-y-auto lg:h-[86vh] px-4"><DashboardView /></div>;
    case "search":
      return <div className="flex-1 overflow-y-auto lg:h-[86vh] px-4"><SearchMission /></div>;
    case "missions":
      return <div className="flex-1 overflow-y-auto lg:h-[86vh] px-4"><MyMissions /></div>;
    case "ranking":
      return <div className="flex-1 overflow-y-auto lg:h-[86vh] px-4"><Ranking /></div>;
    case "stats":
      return <div className="flex-1 overflow-y-auto lg:h-[86vh] px-4"><Stats /></div>;
    case "shop":
      return <div className="flex-1 overflow-y-auto lg:h-[86vh] px-4"><Shop /></div>;
    default:
      return <div className="flex-1 overflow-y-auto lg:h-[86vh] px-4"><DashboardView /></div>;
  }
};

export default AppContent;
