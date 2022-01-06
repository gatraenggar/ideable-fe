import { useContext, useEffect, useState } from "react";
import { WorkspaceContext } from "../../../../Pages/Dashboard";
import { FolderIcon, ListIcon } from "../../Utils";
import httpDeleteFolder from "../../../../API/HTTP/DeleteFolder";

export default function Folder({
    isDarkTab,
    folderTitle,
    workspaceIndex,
    folderIndex,

    currentWorkspaceIdx,
    currentFolderIdx,

    setCurrentWorkspaceIdx,
    setCurrentFolderIdx,
    setCurrentListIdx,
}) {
    const { workspaces } = useContext(WorkspaceContext);
    const [showList, setShowList] = useState(false);
    const [isOptionOpen, setIsOptionOpen] = useState(false);

    useEffect(() => {
        if (
            (currentWorkspaceIdx !== workspaceIndex) ||
            (currentWorkspaceIdx === workspaceIndex && currentFolderIdx !== folderIndex)
        ) setIsOptionOpen(false);
    }, [
        currentWorkspaceIdx,
        workspaceIndex,
        currentFolderIdx,
        folderIndex,
    ]);

    const deleteFolder = async (workspaceID, folderID, fetchContents) => {
        if (!window.confirm("Are you sure to delete this workspace?")) return;

        const httpResponse = await httpDeleteFolder(workspaceID, folderID);
        alert(httpResponse.message);

        if (httpResponse.status !== "success") return;

        await fetchContents();
        setCurrentWorkspaceIdx(null);
        setCurrentFolderIdx(null);
    };

    return (
        <div
            className="d-flex justify-content-between align-items-center p-1 hover-trigger"
            onClick={() => {
                setShowList(!showList)
                setCurrentWorkspaceIdx(workspaceIndex);
                setCurrentFolderIdx(folderIndex);
                setCurrentListIdx(null);
            }}
        >
            <div style={{ marginLeft: "30px", marginBottom: "6px", fontSize: "0.9em" }}>
                <div
                    className="d-flex justify-content-start align-items-center text-clickable"
                    onClick={() => setIsOptionOpen(false)}
                >
                    <FolderIcon isOpen={showList} />
                    <span className="mx-2"> {folderTitle} </span>
                </div>

                <WorkspaceContext.Consumer>
                    {({ fetchContents }) => (
                        <div className={isDarkTab ? "dark-dropdown-content" : "light-dropdown-content"} hidden={!isOptionOpen} >
                            <div onClick={() => { }}>
                                + Add List
                            </div>

                            <div>
                                ~ Change Folder Name
                            </div>

                            <div onClick={() => deleteFolder(workspaces[workspaceIndex].uuid, workspaces[workspaceIndex].folders[folderIndex].uuid, fetchContents)}>
                                -- Delete Folder
                            </div>
                        </div>
                    )}
                </WorkspaceContext.Consumer>
            </div>

            <div
                className="mx-1 display-on-hover"
                onClick={() => setIsOptionOpen(!isOptionOpen)}
                style={{ cursor: "pointer" }}
            >
                ?
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
