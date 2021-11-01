import { useState } from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarSearch from "./SidebarSearch";
import SidebarThemeToggler from "./SidebarThemeToggler";
import SidebarWorkspaceSegment from "./SidebarWorkspaceSegment";

export default function DashboardSidebar({ showTab, setShowTab }) {
    const [isDarkTab, setIsDarkTab] = useState(false);

    return (
        <div className={`${showTab ? "col-2" : "d-none"} px-2 sidebar-workspace-scroller`} style={{ height: "95vh", backgroundColor: isDarkTab ? "#20262b" : "#fff" }}>
            <SidebarHeader isDarkTab={isDarkTab} showTab={showTab} setShowTab={(currentShowTab) => setShowTab(currentShowTab)} />

            <SidebarSearch isDarkTab={isDarkTab} />

            <SidebarWorkspaceSegment isDarkTab={isDarkTab} />

            <SidebarThemeToggler isDarkTab={isDarkTab} setIsDarkTab={(currentIsDarkTab) => setIsDarkTab(currentIsDarkTab)} />
        </div>
    );
}
