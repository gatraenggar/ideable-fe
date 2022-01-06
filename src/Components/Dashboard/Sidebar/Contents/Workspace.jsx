import { useContext, useEffect, useState } from "react";
import { WorkspaceContext } from "../../../../Pages/Dashboard";
import { DropdownArrowIcon } from "../../Utils";
import Folder from "./Folder";
import FolderFormLayer from "../../Components/FolderFormLayer";
import DeleteWorkspace from "../../../../API/HTTP/DeleteWorkspace";

export default function Workspace({
    isDarkTab,
    workspaceTitle,
    workspaceIndex,
    currentWorkspaceIdx,
    setCurrentWorkspaceIdx,
    setCurrentFolderIdx,
    setCurrentListIdx,
}) {
    const { workspaces } = useContext(WorkspaceContext);
    const [showFolder, setShowFolder] = useState(false);
    const [isFolderFormOpen, setIsFolderFormOpen] = useState(false);
    const [isOptionOpen, setIsOptionOpen] = useState(false);

    useEffect(() => {
        if (!(currentWorkspaceIdx === workspaceIndex)) setIsOptionOpen(false);
    }, [currentWorkspaceIdx, workspaceIndex]);

    const deleteWorkspace = async (workspaceID, fetchContents) => {
        if (!window.confirm("Are you sure to delete this workspace?")) return;

        const httpResponse = await DeleteWorkspace(workspaceID);
        alert(httpResponse.message);

        if (httpResponse.status !== "success") return;

        await fetchContents();
        setCurrentWorkspaceIdx(null);
    };

    return (
        <>
            <div
                onClick={() => {
                    setShowFolder(!showFolder);
                    setCurrentWorkspaceIdx(workspaceIndex);
                    setCurrentFolderIdx(null);
                    setCurrentListIdx(null);
                }}
            >
                <div
                    className={`d-flex justify-content-between align-items-center p-1 hover-trigger ${isDarkTab ? "dark-ws-icon-hover" : "light-ws-icon-hover"}`}
                    style={{ marginBottom: "6px" }}
                >
                    <div className="w-100 text-clickable">
                        <div onClick={() => setIsOptionOpen(false)}>
                            <DropdownArrowIcon isDarkTab={isDarkTab} isOpen={showFolder} />
                            <span className="mx-2" title={workspaceTitle.length > 25 ? workspaceTitle : null}>
                                {workspaceTitle.length > 25 ? workspaceTitle.slice(0, 26) + "..." : workspaceTitle}
                            </span>
                        </div>

                        <WorkspaceContext.Consumer>
                            {({ fetchContents }) => (
                                <div className={isDarkTab ? "dark-dropdown-content" : "light-dropdown-content"} hidden={!isOptionOpen} >
                                    <div onClick={() => setIsFolderFormOpen(true)}>
                                        + Add Folder
                                    </div>

                                    <div>
                                        ~ Change Workspace Name
                                    </div>

                                    <div onClick={() => deleteWorkspace(workspaces[workspaceIndex].uuid, fetchContents)}>
                                        -- Delete Workspace
                                    </div>
                                </div>
                            )}
                        </WorkspaceContext.Consumer>

                        <FolderFormLayer
                            isFolderFormOpen={isFolderFormOpen}
                            setIsFolderFormOpen={setIsFolderFormOpen}
                            workspaceID={workspaces[workspaceIndex].uuid}
                        />
                    </div>

                    <div
                        className="mx-1 display-on-hover"
                        onClick={() => setIsOptionOpen(!isOptionOpen)}
                        style={{ cursor: "pointer" }}
                    >
                        ?
                    </div>
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
        </>
    );
}
