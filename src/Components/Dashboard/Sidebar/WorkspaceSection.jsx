import { useContext, useState } from "react";
import { AllWorkspacesIcon, DropdownArrowIcon, FolderIcon, ListIcon } from "../Utils";
import { WorkspaceContext } from "../../../Pages/Dashboard";

export default function WorkspaceSection({
    isDarkTab,
    setCurrentWorkspaceIdx,
    setCurrentFolderIdx,
    setCurrentListIdx,
}) {
    return (
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
                <WorkspaceList
                    isDarkTab={isDarkTab}
                    setCurrentWorkspaceIdx={setCurrentWorkspaceIdx}
                    setCurrentFolderIdx={setCurrentFolderIdx}
                    setCurrentListIdx={setCurrentListIdx}
                />
            </div>
        </>
    );
}

function WorkspaceList({
    isDarkTab,
    setCurrentWorkspaceIdx,
    setCurrentFolderIdx,
    setCurrentListIdx,
}) {
    const { workspaces } = useContext(WorkspaceContext);

    return (
        <div className="fw-bold text-secondary" style={{ fontSize: "0.9em" }}>
            <div
                onClick={() => {
                    setCurrentWorkspaceIdx(null)
                    setCurrentFolderIdx(null)
                    setCurrentListIdx(null)
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
    );
}

function Workspace({
    isDarkTab,
    workspaceTitle,
    workspaceIndex,
    setCurrentWorkspaceIdx,
    setCurrentFolderIdx,
    setCurrentListIdx,
}) {
    const { workspaces } = useContext(WorkspaceContext);
    const [showFolder, setShowFolder] = useState(false);

    return (
        <div>
            <div
                onClick={() => {
                    setShowFolder(!showFolder)
                    setCurrentWorkspaceIdx(workspaceIndex)
                    setCurrentFolderIdx(null)
                    setCurrentListIdx(null)
                }
            }>
                <div
                    className={`d-flex justify-content-start align-items-center p-1 text-clickable ${isDarkTab ? "dark-ws-icon-hover" : "light-ws-icon-hover"}`}
                    style={{ marginBottom: "6px" }}
                >
                    <DropdownArrowIcon isDarkTab={isDarkTab} isOpen={showFolder} />
                    <span className="mx-2">
                        {workspaceTitle}
                    </span>
                </div>
            </div>
            {
                showFolder && workspaces[workspaceIndex].folders ?
                    workspaces[workspaceIndex].folders.map(({ name }, index) => {
                        return (
                            <div key={index} >
                                <Folder 
                                    folderTitle={name}
                                    workspaceIndex={workspaceIndex}
                                    folderIndex={index}
                                    setCurrentWorkspaceIdx={setCurrentWorkspaceIdx}
                                    setCurrentFolderIdx={setCurrentFolderIdx}
                                    setCurrentListIdx={setCurrentListIdx}
                                />
                            </div>
                        );
                    })
                    :
                    null
            }
        </div>
    );
}

function Folder({
    folderTitle,
    workspaceIndex,
    folderIndex,
    setCurrentWorkspaceIdx,
    setCurrentFolderIdx,
    setCurrentListIdx,
}) {
    const { workspaces } = useContext(WorkspaceContext);
    const [showList, setShowList] = useState(false);

    return (
        <div>
            <div
                style={{ marginLeft: "30px", marginBottom: "6px", fontSize: "0.9em" }}
                onClick={() => {
                    setShowList(!showList);
                    setCurrentWorkspaceIdx(workspaceIndex);
                    setCurrentFolderIdx(folderIndex);
                    setCurrentListIdx(null);
                }}
            >
                <div className="d-flex justify-content-start align-items-center text-clickable">
                    <FolderIcon isOpen={showList} />
                    <span className="mx-2"> {folderTitle} </span>
                </div>
            </div>
            {
                showList && workspaces[workspaceIndex].folders[folderIndex] ?
                    workspaces[workspaceIndex].folders[folderIndex].lists.map(({ name: listTitle }, titleIndex) => {
                        return (
                            <div
                                key={titleIndex}
                                className="d-flex justify-content-start align-items-center text-clickable"
                                style={{ marginLeft: "60px", marginBottom: "6px", fontSize: "0.9em" }}
                                onClick={() => {
                                    setCurrentWorkspaceIdx(workspaceIndex);
                                    setCurrentFolderIdx(folderIndex);
                                    setCurrentListIdx(titleIndex);
                                }}
                            >
                                <ListIcon />
                                <span className="mx-2"> {listTitle} </span>
                            </div>
                        );
                    })
                    :
                    null
            }
        </div>
    );
}