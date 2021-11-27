import { useState } from "react";
import { AllWorkspacesIcon, DropdownArrowIcon, FolderIcon, ListIcon } from "../Utils";
import { fakeWorkspaces as workspaces } from "../../../Constants/fakeWorkspaces";

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
    return (
        <div className="fw-bold text-secondary" style={{ fontSize: "0.9em" }}>
            <AllWorkspacesIcon isDarkTab={isDarkTab} />
            {
                workspaces.map(({ title, folders }, index) => {
                    return (
                        <div key={index}>
                            <Workspace isDarkTab={isDarkTab} workspaceTitle={title} folders={folders} />
                        </div>
                    );
                })
            }
        </div>
    );
}

function Workspace({ isDarkTab, workspaceTitle, folders }) {
    const [showFolder, setShowFolder] = useState(false);

    return (
        <div>
            <div onClick={() => setShowFolder(!showFolder)}>
                <DropdownArrowIcon isDarkTab={isDarkTab} workspaceTitle={workspaceTitle} />
            </div>
            {
                showFolder ?
                    folders.map(({ title, list }, index) => {
                        return (
                            <div key={index} >
                                <Folder folderTitle={title} list={list} />
                            </div>
                        );
                    })
                    :
                    null
            }
        </div>
    );
}

function Folder({ folderTitle, list }) {
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
                showList ?
                    list.map(({ title: listTitle }, index) => {
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
