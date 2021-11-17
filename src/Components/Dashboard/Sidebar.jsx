import { useState } from "react";
import Header from "./Sidebar/Header";
import Search from "./Sidebar/Search";
import WorkspaceList from "./Sidebar/WorkspaceList";
import ThemeToggler from "./Sidebar/ThemeToggler";

export default function DashboardSidebar({ showTab, setShowTab }) {
    const [isDarkTab, setIsDarkTab] = useState(false);

    return (
        <div className={`${showTab ? "col-2" : "d-none"} px-2 sidebar-workspace-scroller`} style={{ height: "95vh", backgroundColor: isDarkTab ? "#20262b" : "#fff" }}>
            <Header isDarkTab={isDarkTab} showTab={showTab} setShowTab={(currentShowTab) => setShowTab(currentShowTab)} />

            <Search isDarkTab={isDarkTab} />

            <WorkspaceList isDarkTab={isDarkTab} />

            <ThemeToggler isDarkTab={isDarkTab} setIsDarkTab={(currentIsDarkTab) => setIsDarkTab(currentIsDarkTab)} />
        </div>
    );
}
