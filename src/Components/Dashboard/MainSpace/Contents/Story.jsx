import { useContext, useState } from "react";
import { WorkspaceContext } from "../../../../Pages/Dashboard";
import { AssigneeIcon, DropdownArrowIcon, PriorityFlag, SettingGear, ItemBranchIcon } from "./Utils";
import httpGetTasks from "../../../../API/HTTP/GetTasks";
import Task from "./Task";
import httpDeleteStory from "../../../../API/HTTP/DeleteStory";

export default function Story({
    workspaceIndex,
    folderIndex,
    listIndex,
    storyIndex,
}) {

    const [isTaskOpen, setIsTaskOpen] = useState(false);
    const [isTaskFetched, setIsTaskFetched] = useState(false);
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
    };

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
                isTaskFetched={isTaskFetched}
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
                                            isTaskOpen={isTaskOpen}
                                            setIsTaskOpen={setIsTaskOpen}
                                            workspaceIndex={workspaceIndex}
                                            folderIndex={folderIndex}
                                            listIndex={listIndex}
                                        />
                                    </div>
                                );
                            })
                        :
                        null
                }
            </div>
        </>
    );
}

function StoryRow({
    story,
    workspaceID,
    isTaskOpen,
    showTask,
}) {
    const [isOptionOpen, setIsOptionOpen] = useState(false);
    const [isSettingShown, setIsSettingShown] = useState(false);

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
        setIsOptionOpen(false);
    };

    if (!story) return null;

    return (
        <div
            className="d-flex justify-content-between px-3 py-2 bg-white"
            style={{ maxHeight: "40px" }}
            onMouseEnter={() => setIsSettingShown(true)}
            onMouseLeave={() => { if (!isOptionOpen) setIsSettingShown(false); }}
        >
            <div>
                <div style={{ display: "inline-block", position: "relative", top: "-1px", width: "10px" }}>
                    <span hidden={false} style={{ cursor: "pointer" }} onClick={async () => await showTask()}>
                        <DropdownArrowIcon isOpen={isTaskOpen} width={10} height={10} noBorder />
                    </span>
                </div>

                <div style={{ display: "inline-block" }}>
                    <span> &nbsp; {story.name} </span>

                    <span className="mx-1 px-1 border rounded-top rounded-bottom" hidden={true} style={{ display: "inline-block", cursor: "pointer" }}>
                        <span onClick={async () => await showTask()}>
                            <ItemBranchIcon />

                            <span className="fw-bold" style={{ marginRight: "3px", fontSize: "13.5px", color: "#7d838e" }}>
                                {/* {story.tasks.length} */}
                            </span>
                        </span>

                        <span style={{ display: "inline-block", borderLeft: "solid 1px lightgrey", height: "10px", marginLeft: "5px" }}>
                        </span>

                        <span className="text-secondary"> + </span>
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
                                <span onClick={() => setIsOptionOpen(!isOptionOpen)}>
                                    <SettingGear />
                                </span>

                                <div
                                    className="light-dropdown-content"
                                    style={{ position: "relative", minWidth: "max-content" }}
                                    hidden={!isOptionOpen}
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
    );
}
