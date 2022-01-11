import { useContext, useEffect, useRef, useState } from "react";
import { AssigneeIcon, PriorityFlag, SettingGear } from "./Utils";
import { WorkspaceContext } from "../../../../Pages/Dashboard";
import httpPostTask from "../../../../API/HTTP/PostTask";

export default function TaskForm({
    inputActive = false,
    setIsFormOpen = () => { },
    setIsTaskFetched,
    setIsStoryFetched,
    workspaceIndex,
    folderIndex,
    listIndex,
    storyIndex,
}) {
    const [isInputting, setIsInputting] = useState(inputActive ? true : false);
    const [taskName, setTaskName] = useState(inputActive ? "" : "Add New Task");
    const inputRef = useRef(null);
    const { workspaces } = useContext(WorkspaceContext);

    useEffect(() => {
        if (inputActive) inputRef.current.focus();
    });

    const createTask = async (event, workspaceID, storyID) => {
        event.preventDefault();
        if (taskName.length < 3 || taskName.length > 80) {
            alert("Title length should be 1-80 characters");
            return;
        }

        const httpResponse = await httpPostTask({ name: taskName.trim() }, workspaceID, storyID);

        if (httpResponse.status !== "success") {
            alert(httpResponse.message);
            return;
        }

        setTaskName("");
        setIsInputting(false);
        setIsFormOpen(false);
        setIsTaskFetched(false);
        setIsStoryFetched(false);
    };

    return (
        <div className={`d-flex justify-content-between px-3 py-2 bg-white ${isInputting || inputActive ? "border border-success" : null}`}>
            <div style={{ display: "inline-block", width: "75%", textIndent: "4%", }}>
                &#9643; &nbsp;

                <input
                    type="text"
                    autoComplete="off"
                    ref={inputRef}
                    name="story"
                    id="story"

                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            createTask(
                                e,
                                workspaces[workspaceIndex].uuid,
                                workspaces[workspaceIndex].folders[folderIndex].lists[listIndex].stories[storyIndex].uuid,
                            );
                        }
                    }}
                    onClick={() => {
                        if (!isInputting) setTaskName("");
                        setIsInputting(true);
                    }}

                    style={{
                        width: "81%",
                        outline: "none",
                        border: "none",
                        color: isInputting || inputActive ? "black" : "lightgrey",
                    }}
                />

                <span
                    className="btn btn-success mx-1"
                    hidden={!isInputting && !inputActive}
                    onClick={(e) => {
                        createTask(
                            e,
                            workspaces[workspaceIndex].uuid,
                            workspaces[workspaceIndex].folders[folderIndex].lists[listIndex].stories[storyIndex].uuid,
                        );
                    }}
                    style={{
                        display: "inline",
                        height: "25px",
                        padding: "3px 11px",
                        fontSize: "12px",
                    }}
                >
                    Save
                </span>

                <span
                    className="btn btn-danger"
                    hidden={!isInputting && !inputActive}
                    onClick={() => {
                        if (!inputActive) setTaskName("Add New Story");
                        setIsInputting(false);
                        setIsFormOpen(false);
                    }}
                    style={{
                        display: "inline",
                        height: "25px",
                        padding: "3px 7px",
                        fontSize: "12px",
                    }}
                >
                    Cancel
                </span>
            </div>

            <div className="row row-cols-3 justify-content-center mx-1" style={{ width: "25%" }}>
                <span className="col text-center">
                    <AssigneeIcon />
                </span>

                <span className="col text-center">
                    <PriorityFlag color={"lightgrey"} />
                </span>

                <span className="col text-center">
                    <SettingGear />
                </span>
            </div>
        </div>
    );
}
