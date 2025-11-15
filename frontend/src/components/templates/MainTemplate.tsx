import EmptyTemplate from "./EmptyTemplate";
import Footer from "../organisms/Footer";
import HeaderDash from "../organisms/HeaderDash";
import { useLocation } from "react-router-dom";
import Header from "../organisms/Header";


const MainTemplate = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const location = useLocation()
  return (
    <EmptyTemplate>
    {(location.pathname === "/" || location.pathname === "/gdpr" || location.pathname === "privacy" || location.pathname === "contact") ? <Header /> : <HeaderDash />}
      <main className={`grow flex flex-col justify-center items-center bg-gradient-to-br from-[rgb(49,38,90)] to-[rgb(22,22,30)] shadow-indigo-900 ${className}`}>
        {children}
      </main>
      <Footer />
    </EmptyTemplate>
  );
};

export default MainTemplate;
