import { useState } from "react";
import Sidebar from "../Components/Dashboard/Sidebar";
import MainSpace from "../Components/Dashboard/MainSpace";

export default function Dashboard(){
    const [showTab, setShowTab] = useState(true)
    
    return(
        <div className="d-flex" style={{height: "100vh"}}>
            <Sidebar showTab={showTab} setShowTab={(currentShowTab) => setShowTab(currentShowTab)} />
            <MainSpace showTab={showTab} setShowTab={(currentShowTab) => setShowTab(currentShowTab)} />
        </div>
    )
}
