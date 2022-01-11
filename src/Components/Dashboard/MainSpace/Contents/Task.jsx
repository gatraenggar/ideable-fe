import { useState } from "react";
import { AssigneeIcon, PriorityFlag, SettingGear } from "./Utils";
import httpDeleteTask from "../../../../API/HTTP/DeleteTask";

export default function Task({
    task,
    workspaceID,
    setIsTaskFetched,
    setIsStoryFetched,
}) {
    const [isSettingShown, setIsSettingShown] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const priorityColor = {
        1: 'lightgrey',
        2: 'yellow',
        3: 'red',
    };

    const deleteTask = async (workspaceID, taskID) => {
        if (!window.confirm("Are you sure to delete this task?")) return;

        const httpResponse = await httpDeleteTask(workspaceID, taskID);
        alert(httpResponse.message);

        if (httpResponse.status !== "success") return;

        setIsTaskFetched(false);
        setIsStoryFetched(false);
        // setIsDropdownOpen(false);
    };

    return (
        <div
            className="d-flex justify-content-between px-3 py-2 highlight-on-hover"
            onMouseEnter={() => setIsSettingShown(true)}
            onMouseLeave={() => { if (!isDropdownOpen) setIsSettingShown(false); }}
            style={{ maxHeight: "40px" }}
        >
            <div style={{ display: "inline-block", width: "75%", textIndent: "4%", }}>
                <span> &#9643; &nbsp; {task.name} </span>
            </div>

            <div className="row row-cols-3 justify-content-center mx-1" style={{ width: "25%" }}>
                <span className="col text-center">
                    <AssigneeIcon />
                </span>

                <span className="col text-center">
                    <PriorityFlag color={priorityColor[task.priority]} />
                </span>

                <span className="col text-center" style={{ cursor: "pointer" }}>
                    {
                        isSettingShown ?
                            <>
                                <span onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                    <SettingGear />
                                </span>

                                <div
                                    className="light-dropdown-content"
                                    style={{ position: "relative", minWidth: "max-content" }}
                                    hidden={!isDropdownOpen}
                                >
                                    <div onClick={() => deleteTask(workspaceID, task.uuid)}>
                                        - Delete Task
                                    </div>
                                </div>
                            </>
                            :
                            <span> &nbsp; </span>
                    }
                </span>
            </div>
        </div>
    );
}
