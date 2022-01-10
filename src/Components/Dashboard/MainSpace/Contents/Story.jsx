import { useCallback, useContext, useEffect, useState } from "react";
import { WorkspaceContext } from "../../../../Pages/Dashboard";
import { AssigneeIcon, DropdownArrowIcon, PriorityFlag, SettingGear, ItemBranchIcon } from "./Utils";
import httpGetTasks from "../../../../API/HTTP/GetTasks";
import Task from "./Task";
import TaskForm from "./TaskForm";
import httpDeleteStory from "../../../../API/HTTP/DeleteStory";

export default function Story({
    workspaceIndex,
    folderIndex,
    listIndex,
    storyIndex,
}) {
    const [isTaskOpen, setIsTaskOpen] = useState(false);
    const [isTaskFetched, setIsTaskFetched] = useState(false);
    const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
    const { workspaces } = useContext(WorkspaceContext);

    const fetchTasks = async () => {
        workspaces[workspaceIndex]
            .folders[folderIndex]
            .lists[listIndex]
            .stories[storyIndex]
            .tasks = await httpGetTasks(
                [workspaces[workspaceIndex].uuid],
                [workspaces[workspaceIndex]
                    .folders[folderIndex]
                    .lists[listIndex]
                    .stories[storyIndex].uuid],
            );
    };

    const showTask = async () => {
        if (!isTaskFetched) {
            await fetchTasks();
            setIsTaskFetched(true);
        }
        setIsTaskOpen(!isTaskOpen);
        // setIsTaskOpen(true);
    };

    const fetchTasksCallback = useCallback(async () => {
        await fetchTasks();
        setIsTaskOpen(true);
        setIsTaskFetched(true);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isTaskOpen && !isTaskFetched) fetchTasksCallback();
    }, [isTaskOpen, isTaskFetched, fetchTasksCallback]);

    return (
        <>
            <StoryRow
                story={
                    workspaces[workspaceIndex]
                        .folders[folderIndex]
                        .lists[listIndex]
                        .stories[storyIndex]
                }
                workspaceID={workspaces[workspaceIndex].uuid}
                isTaskOpen={isTaskOpen}
                isTaskFetched={isTaskFetched}
                setIsTaskFormOpen={setIsTaskFormOpen}
                showTask={showTask}
            />

            <div className="w-100">
                {
                    isTaskOpen && isTaskFetched ?
                        workspaces[workspaceIndex]
                            .folders[folderIndex]
                            .lists[listIndex]
                            .stories[storyIndex]
                            .tasks.map((task, index) => {
                                return (
                                    <div key={index}>
                                        <Task
                                            task={task}
                                        />
                                    </div>
                                );
                            })
                        :
                        null
                }

                <div hidden={!isTaskFormOpen}>
                    <TaskForm
                        inputActive

                        workspaceIndex={workspaceIndex}
                        folderIndex={folderIndex}
                        listIndex={listIndex}
                        storyIndex={storyIndex}

                        setIsFormOpen={setIsTaskFormOpen}
                        setIsTaskOpen={setIsTaskOpen}
                        setIsTaskFetched={setIsTaskFetched}
                    />
                </div>
            </div>
        </>
    );
}

function StoryRow({
    story,
    workspaceID,
    isTaskOpen,
    isTaskFetched,
    setIsTaskFormOpen,
    showTask,
}) {
    const [isSettingShown, setIsSettingShown] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const priorityColor = {
        1: 'lightgrey',
        2: 'yellow',
        3: 'red',
    };

    const deleteStory = async (workspaceID, storyID, fetchContents) => {
        if (!window.confirm("Are you sure to delete this story?")) return;

        const httpResponse = await httpDeleteStory(workspaceID, storyID);
        alert(httpResponse.message);

        if (httpResponse.status !== "success") return;

        await fetchContents();
        setIsDropdownOpen(false);
    };

    if (!story) return null;

    return (
        <>
            <div
                className="d-flex justify-content-between px-3 py-2 bg-white"
                style={{ maxHeight: "40px" }}
                onMouseEnter={() => setIsSettingShown(true)}
                onMouseLeave={() => { if (!isDropdownOpen) setIsSettingShown(false); }}
            >
                <div>
                    <div style={{ display: "inline-block", position: "relative", top: "-1px", width: "10px" }}>
                        <span hidden={false} style={{ cursor: "pointer" }} onClick={async () => await showTask()}>
                            <DropdownArrowIcon isOpen={isTaskOpen} width={10} height={10} noBorder />
                        </span>
                    </div>

                    <div style={{ display: "inline-block" }}>
                        <span> &nbsp; {story.name} </span>

                        <span className="mx-1 px-1 border rounded-top rounded-bottom" hidden={!isTaskFetched && !isSettingShown && !isTaskOpen} style={{ display: "inline-block", cursor: "pointer" }}>
                            <span onClick={async () => await showTask()}>
                                <ItemBranchIcon />

                                <span className="fw-bold" style={{ marginRight: "3px", fontSize: "13.5px", color: "#7d838e" }}>
                                    {isTaskFetched && story.tasks ? story.tasks.length : null}
                                </span>
                            </span>

                            <span style={{ display: "inline-block", borderLeft: "solid 1px lightgrey", height: "10px", marginLeft: "5px" }}>
                            </span>

                            <span className="text-secondary" onClick={() => setIsTaskFormOpen(true)}> + </span>
                        </span>
                    </div>
                </div>

                <div className="row row-cols-3 justify-content-center mx-1" style={{ width: "25%" }}>
                    <span className="col text-center">
                        <AssigneeIcon />
                    </span>

                    <span className="col text-center">
                        <PriorityFlag color={priorityColor[story.priority]} />
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
                                        <WorkspaceContext.Consumer>
                                            {
                                                ({ fetchContents }) => (
                                                    <div
                                                        onClick={() => deleteStory(
                                                            workspaceID,
                                                            story.uuid,
                                                            fetchContents,
                                                        )}
                                                    >
                                                        - Delete Story
                                                    </div>
                                                )
                                            }
                                        </WorkspaceContext.Consumer>
                                    </div>
                                </>
                                :
                                <span> &nbsp; </span>
                        }
                    </span>
                </div>
            </div>
        </>
    );
}
