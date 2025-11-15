import "./Sidebar.css";
import Link from "../../atoms/Link";
import { H3 } from "../../atoms/Headers";
import type { View } from "../../../types/generic-types";

interface SidebarProps {
  activeView: View;
  onChangeView: (view: View) => void;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Sidebar: React.FC<SidebarProps> = ({ activeView, onChangeView }) => {
  const mode = localStorage.getItem(import.meta.env.VITE_LS_ROLE_KEY);

  const handleClick = (view: View) => {
    onChangeView(view);
  };
  return (
    <>
      <div className="sidebar-content">
        <H3 className="border-b pb-2 mb-0">Navigation</H3>
        <Link
          href=""
          className="py-2 border-b"
          onClick={() => handleClick("dashboard")}
        >
          Dashboard
        </Link>
        {mode === "builder" && (
          <Link
            href=""
            className="py-2 border-b"
            onClick={() => handleClick("search")}
          >
            Search Mission
          </Link>
        )}
        <Link
          href=""
          className="py-2 border-b"
          onClick={() => handleClick("missions")}
        >
          My missions
        </Link>
        <Link
          href=""
          className="py-2 border-b"
          onClick={() => handleClick("ranking")}
        >
          Ranking
        </Link>
        <Link
          href=""
          className="py-2 border-b"
          onClick={() => handleClick("stats")}
        >
          Stats <span className="text-xs">(soon)</span>
        </Link>
        <Link
          href=""
          className="py-2 border-b"
          onClick={() => handleClick("shop")}
        >
          Shop <span className="text-xs">(soon)</span>
        </Link>
      </div>
    </>
  );
};

export default Sidebar;
