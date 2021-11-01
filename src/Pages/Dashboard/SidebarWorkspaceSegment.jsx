import WorkspaceList from "./WorkspaceList";

export default function SidebarWorkspaceSegment({isDarkTab}){
    return(
        <>
            <div className={`d-flex mt-2 px-1 py-1 fw-bold text-secondary border-bottom ${isDarkTab ? "border-secondary" : ""}`} >
                Workspace
            </div>

            <div className="my-3">
                <button type="button" className={`w-100 py-1 fw-bold ${isDarkTab ? "dark-workspace-button" : "light-workspace-button"}`} >
                    <span> + </span>
                    <span style={{ fontSize: "0.92em" }}> Create Workspace </span>
                </button>
            </div>

            <div className="fw-bold text-secondary" style={{ fontSize: "0.9em" }}>
                <WorkspaceList isDarkTab={isDarkTab} />
            </div>
        </>
    )
}
