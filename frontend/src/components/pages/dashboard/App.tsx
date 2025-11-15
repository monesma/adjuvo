import { useState } from "react";
import AppContent from "../../organisms/Dashboard/AppContent"
import Sidebar from "../../organisms/Sidebar/Sidebar"
import DashboardTemplate from "../../templates/DashboardTemplate"
import type { View } from "../../../types/generic-types";

const App = () => {
    const [activeView, setActiveView] = useState<View>("dashboard");
    
    return <DashboardTemplate>
      <>
        <Sidebar activeView={activeView} onChangeView={(txt: View)=>setActiveView(txt)} />
        <AppContent activeView={activeView} />
      </>
    </DashboardTemplate>
}

export default App