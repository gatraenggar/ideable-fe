import { WorkspaceContext } from "../../../../Pages/Dashboard";
import { useContext, useState } from "react";
import Folder from "./Folder";
import FolderFormLayer from "../../Components/FolderFormLayer";

export default function Workspace({
    workspaceIndex,
    workspaceTitle,
    currentWorkspaceIdx,
    currentFolderIdx,
    currentListIdx,
}) {
    const { workspaces } = useContext(WorkspaceContext);
    const [isFolderFormOpen, setIsFolderFormOpen] = useState(false);

    return (
        <>
            {
                workspaces[workspaceIndex].hasOwnProperty("folders")
                    && workspaces[workspaceIndex].folders.length ?
                    workspaces[workspaceIndex].folders.map(({ name: folderTitle }, folderIndex) => {
                        return (
                            (currentFolderIdx !== null && folderIndex === currentFolderIdx)
                                || currentFolderIdx === null ?
                                <Folder
                                    key={folderIndex}
                                    workspaceTitle={workspaceTitle}
                                    workspaceIndex={workspaceIndex}
                                    folderTitle={folderTitle}
                                    folderIndex={folderIndex}
                                    currentListIdx={currentListIdx}
                                />
                                :
                                null
                        );
                    })
                    :
                    currentWorkspaceIdx === null ?
                        null
                        :
                        <div className="d-flex flex-column justify-content-center align-items-center h-100">
                            <h4 className="py-3 text-secondary text-center">
                                Clean like a brand new workspace here...
                            </h4>

                            <button className="btn btn-secondary" onClick={() => setIsFolderFormOpen(!isFolderFormOpen)}>
                                Add Folder
                            </button>

                            <FolderFormLayer
                                isFolderFormOpen={isFolderFormOpen}
                                setIsFolderFormOpen={setIsFolderFormOpen}
                                workspaceID={workspaces[workspaceIndex].uuid}
                            />
                        </div>
            }
        </>
    );
}
