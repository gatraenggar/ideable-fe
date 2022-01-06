import { useContext, useState } from "react";
import { AllWorkspacesIcon } from "../Utils";
import { WorkspaceContext } from "../../../Pages/Dashboard";
import Workspace from "./Contents/Workspace";
import WorkspaceFormLayer from "./Contents/WorkspaceFormLayer";

export default function ContentList({
    isDarkTab,
    currentWorkspaceIdx,
    currentFolderIdx,
    setCurrentWorkspaceIdx,
    setCurrentFolderIdx,
    setCurrentListIdx,
}) {
    const { workspaces } = useContext(WorkspaceContext);
    const [isWorkspaceFormOpen, setIsWorkspaceFormOpen] = useState(false);

    return (
        <>
            <div className={`d-flex mt-2 px-1 py-1 fw-bold text-secondary border-bottom ${isDarkTab ? "border-secondary" : ""}`} >
                Workspace
            </div>

            <div className="my-3">
                <button
                    type="button"
                    onClick={async () => setIsWorkspaceFormOpen(!isWorkspaceFormOpen)}
                    className={`w-100 py-1 fw-bold ${isDarkTab ? "dark-workspace-button" : "light-workspace-button"}`} >
                    <span> + </span>
                    <span style={{ fontSize: "0.92em" }}>
                        Create Workspace
                    </span>
                </button>

                <WorkspaceFormLayer isWorkspaceFormOpen={isWorkspaceFormOpen} setIsWorkspaceFormOpen={setIsWorkspaceFormOpen} />
            </div>

            <div className="fw-bold text-secondary" style={{ fontSize: "0.9em" }}>
                <div className="fw-bold text-secondary" style={{ fontSize: "0.9em" }}>
                    <div
                        onClick={() => {
                            setCurrentWorkspaceIdx(null);
                            setCurrentFolderIdx(null);
                            setCurrentListIdx(null);
                        }
                        }>
                        <AllWorkspacesIcon isDarkTab={isDarkTab} />
                    </div>
                    {
                        workspaces.length ?
                            workspaces.map(({ name }, index) => {
                                return (
                                    <Workspace
                                        key={index}
                                        isDarkTab={isDarkTab}
                                        workspaceTitle={name}
                                        workspaceIndex={index}

                                        currentWorkspaceIdx={currentWorkspaceIdx}
                                        currentFolderIdx={currentFolderIdx}

                                        setCurrentWorkspaceIdx={setCurrentWorkspaceIdx}
                                        setCurrentFolderIdx={setCurrentFolderIdx}
                                        setCurrentListIdx={setCurrentListIdx}
                                    />
                                );
                            })
                            :
                            null
                    }
                </div>
            </div>
        </>
    );
}
