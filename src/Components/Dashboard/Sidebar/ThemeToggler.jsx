import { ToggleSwitch } from "../Utils";

export default function SidebarThemeToggler({isDarkTab, setIsDarkTab}){
    return(
        <div className={`d-flex justify-content-center align-items-center fixed-bottom px-3 py-2 ${isDarkTab ? "bg-dark" : "bg-white"}`} style={{ height: "5vh", width: "inherit", zIndex: 0 }}>
            <div className={`mx-3 ${isDarkTab ? "text-secondary" : "text-dark"}`} style={{ fontSize: "1em" }}>
                Dark Theme Sidebar
            </div>
            <div className="text-clickable" onClick={() => setIsDarkTab(!isDarkTab)}>
                <ToggleSwitch isDarkTab={isDarkTab} />
            </div>
        </div>
    )
}
