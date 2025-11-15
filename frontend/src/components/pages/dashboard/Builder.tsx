import { useState } from "react";
import BuilderContent from "../../organisms/Dashboard/BuilderContent"
import Sidebar from "../../organisms/Sidebar/Sidebar"
import DashboardTemplate from "../../templates/DashboardTemplate"
import type { View } from "../../../types/generic-types";

const Builder = () => {
    const [activeView, setActiveView] = useState<View>("dashboard");
    return <DashboardTemplate>
        <>
            <Sidebar activeView={activeView} onChangeView={(txt: View)=>setActiveView(txt)} />
            <BuilderContent activeView={activeView}/>
        </>
    </DashboardTemplate>
}

export default Builder