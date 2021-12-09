import { useContext, useState } from "react";
import { WorkspaceContext } from "../../../../Pages/Dashboard";
import { AssigneeIcon, DropdownArrowIcon, PriorityFlag, ItemBranchIcon } from "./Utils";
import httpGetTasks from "../../../../API/HTTP/GetTasks";
import Task from "./Task";

export default function StorySection({
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
      <Story
        story={
          workspaces[workspaceIndex]
            .folders[folderIndex]
            .lists[listIndex]
            .stories[storyIndex]
        }
        isTaskOpen={isTaskOpen}
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

function Story({
  story,
  isTaskOpen,
  isTaskFetched,
  showTask,
}) {
  const priorityColor = {
    1: 'lightgrey',
    2: 'yellow',
    3: 'red',
  };

  return (
    <div className="d-flex justify-content-between px-3 py-2 bg-white">
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

      <div className="d-flex justify-content-around" style={{ width: "16%" }}>
        <span className="mx-1">
          <AssigneeIcon />
        </span>

        <span className="mx-1">
          <PriorityFlag color={priorityColor[story.priority]} />
        </span>
      </div>
    </div>
  );
}
