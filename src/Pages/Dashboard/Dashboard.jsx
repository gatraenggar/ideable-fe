import { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardWorkspace from "./DashboardWorkspace";

export default function Dashboard(){
    const [showTab, setShowTab] = useState(true)
    
    return(
        <div className="d-flex" style={{height: "100vh"}}>
            <DashboardSidebar showTab={showTab} setShowTab={(currentShowTab) => setShowTab(currentShowTab)} />
            <DashboardWorkspace showTab={showTab} setShowTab={(currentShowTab) => setShowTab(currentShowTab)} />
        </div>
    )
}
