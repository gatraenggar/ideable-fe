import { useContext, useState } from "react";
import { AllWorkspacesIcon, DropdownArrowIcon, FolderIcon, ListIcon } from "../Utils";
import { WorkspaceContext } from "../../../Pages/Dashboard";

export default function SidebarWorkspaceSegment({ isDarkTab }) {
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
                <WorkspaceList isDarkTab={isDarkTab} />
            </div>
        </>
    );
}

function WorkspaceList({ isDarkTab }) {
    const { workspaces } = useContext(WorkspaceContext);

    return (
        <div className="fw-bold text-secondary" style={{ fontSize: "0.9em" }}>
            <AllWorkspacesIcon isDarkTab={isDarkTab} />
            {
                workspaces.map(({ name }, index) => {
                    return (
                        <div key={index}>
                            <Workspace isDarkTab={isDarkTab} workspaceTitle={name} workspaceIndex={index} />
                        </div>
                    );
                })
            }
        </div>
    );
}

function Workspace({ isDarkTab, workspaceTitle, workspaceIndex }) {
    const { workspaces } = useContext(WorkspaceContext);
    const [showFolder, setShowFolder] = useState(false);

    return (
        <div>
            <div onClick={() => setShowFolder(!showFolder)}>
                <DropdownArrowIcon isDarkTab={isDarkTab} workspaceTitle={workspaceTitle} />
            </div>
            {
                showFolder && workspaces[workspaceIndex].folders ?
                    workspaces[workspaceIndex].folders.map(({ name }, index) => {
                        return (
                            <div key={index} >
                                <Folder folderTitle={name} workspaceIndex={workspaceIndex} folderIndex={index} />
                            </div>
                        );
                    })
                    :
                    null
            }
        </div>
    );
}

function Folder({ folderTitle, workspaceIndex, folderIndex }) {
    const { workspaces } = useContext(WorkspaceContext);
    const [showList, setShowList] = useState(false);

    return (
        <div>
            <div
                style={{ marginLeft: "30px", marginBottom: "6px", fontSize: "0.9em" }}
                onClick={() => setShowList(!showList)}
            >
                <FolderIcon folderTitle={folderTitle} />
            </div>
            {
                showList && workspaces[workspaceIndex].folders[folderIndex] ?
                    workspaces[workspaceIndex].folders[folderIndex].lists.map(({ name: listTitle }, index) => {
                        return (
                            <div
                                key={index}
                                className="d-flex justify-content-start align-items-center text-clickable"
                                style={{ marginLeft: "60px", marginBottom: "6px", fontSize: "0.9em" }}
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
