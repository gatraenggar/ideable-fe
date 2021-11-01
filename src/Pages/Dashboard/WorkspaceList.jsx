import { useState } from "react";
import { WorkspaceIcon, FolderIcon, ListIcon } from "./Utils";
import { workspaces } from "./fakeWorkspaces"

export default function WorkspaceList({isDarkTab}){
    return(
        <div className="fw-bold text-secondary" style={{ fontSize: "0.9em" }}>
            {
                workspaces.map(({ title, folders }, index) => {
                    return (
                        <Workspace key={index} isDarkTab={isDarkTab} workspaceTitle={title} folders={folders} />
                    );
                })
            }
        </div>
    )
}

function Workspace({key, isDarkTab, workspaceTitle, folders}){
    const [showFolder, setShowFolder] = useState(false)

    return(
        <div key={key}>
            <div onClick={() => setShowFolder(!showFolder)}>
                <WorkspaceIcon isDarkTab={isDarkTab} workspaceTitle={workspaceTitle} />
            </div>
            {
                showFolder?
                    folders.map(({title, list}, index) => {
                        return(
                            <Folder key={index} folderTitle={title} list={list} />
                        )
                    })
                    :
                    null
            }
        </div>
    )
}

function Folder({key, folderTitle, list}){
    const [showList, setShowList] = useState(false)

    return(
        <>
            <div
                key={key}
                style={{marginLeft: "30px", marginBottom: "6px", fontSize: "0.9em"}}
                onClick={() => setShowList(!showList)}
            >
                <FolderIcon folderTitle={folderTitle} />
            </div>
            {
                showList?
                    list.map((listTitle, index) => {
                        return(
                            <>
                                <div
                                    key={index}
                                    className="d-flex justify-content-start align-items-center text-clickable"
                                    style={{marginLeft: "60px", marginBottom: "6px", fontSize: "0.9em"}}
                                >
                                    <ListIcon />
                                    <span className="mx-2"> {listTitle} </span>
                                </div>
                            </>
                        )
                    })
                    :
                    null
            }
        </>
    )
}
