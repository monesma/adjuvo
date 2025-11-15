import type { ReactElement } from 'react';
import Footer from "../organisms/Footer"
import HeaderDash from '../organisms/HeaderDash';
import './DashboardTemplate.css';

const DashboardTemplate = ({ children } : { children: ReactElement}) => {
  return (
    <div className="dashboard-template text-white bg-gradient-to-br from-[rgb(49,38,90)] to-[rgb(22,22,30)] shadow-indigo-900">
      <HeaderDash />
      <main>
      <div className="content bottom">
          <>{children}</>
        </div>
        </main>
      <Footer />
    </div>
  );
};

export default DashboardTemplate;