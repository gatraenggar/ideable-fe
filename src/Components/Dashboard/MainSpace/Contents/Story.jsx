import { useState } from "react";
import { AssigneeIcon, DropdownArrowIcon, PriorityFlag, ItemBranchIcon } from "./Utils";
import Task from "./Task";

export default function StorySection({ story }) {
  const [isStoryOpen, setIsStoryOpen] = useState(false);

  return (
    <>
      <Story story={story} isStoryOpen={isStoryOpen} setIsStoryOpen={setIsStoryOpen} />

      <div className="w-100">
        {
          isStoryOpen ?
            story.tasks.map((task, index) => {
              return (
                <div key={index}>
                  <Task task={task} isStoryOpen={isStoryOpen} setIsStoryOpen={setIsStoryOpen} />
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

function Story({ story, isStoryOpen, setIsStoryOpen }) {
  const priorityColor = {
    1: 'lightgrey',
    2: 'yellow',
    3: 'red',
  };
  return (
    <div className="d-flex justify-content-between px-3 py-2 bg-white">
      <div>
        <div style={{ display: "inline-block", position: "relative", top: "-1px", width: "10px" }}>
          <span style={{ cursor: "pointer" }} onClick={() => setIsStoryOpen(!isStoryOpen)}>
            <DropdownArrowIcon isOpen={isStoryOpen} width={10} height={10} noBorder />
          </span>
        </div>

        <div style={{ display: "inline-block" }}>
            <span> &nbsp; {story.name} </span>

            <span className="mx-1 px-1 border rounded-top rounded-bottom" hidden={!story.tasks.length} style={{ display: "inline-block", cursor: "pointer" }}>
              <span onClick={() => setIsStoryOpen(!isStoryOpen)}>
                <ItemBranchIcon />

                <span className="fw-bold" style={{ marginRight: "3px", fontSize: "13.5px", color: "#7d838e" }}>
                  {story.tasks.length}
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
