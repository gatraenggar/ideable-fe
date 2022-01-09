import { useState } from "react";
import Story from "./Story";
import StoryForm from "./StoryForm";
import { DropdownArrowIcon } from "./Utils";

export default function StoryFrame({
  title,
  stories,
  labelColor,
  workspaceIndex,
  folderIndex,
  listIndex,
}) {
  const [isStoriesOpen, setIsStoriesOpen] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <div className="d-flex mx-1 my-3">
      <div className="mx-2" style={{ cursor: "pointer" }} onClick={() => setIsStoriesOpen(!isStoriesOpen)}>
        <DropdownArrowIcon isOpen={isStoriesOpen} />
      </div>

      <div className="w-100 d-flex flex-wrap mb-2">
        <div className="w-100 d-flex justify-content-between align-items-center" style={{ fontSize: "13px" }}>
          <div className="d-flex flex-row align-items-center">
            <div className={`d-flex align-items-center rounded-top ${isStoriesOpen ? '' : 'rounded-bottom'} px-2 ${labelColor}`} style={{ width: "fit-content", cursor: "pointer", color: "#fdfdfd" }} onClick={() => setIsStoriesOpen(!isStoriesOpen)}>
              <div className="py-1">
                {title}
              </div>

              <div style={{ display: isStoriesOpen ? "none" : "inline-block", marginLeft: "7px", fontSize: "9.7px", fontWeight: "bold" }}>
                {stories.length === 1 ? "1 TASK" : stories.length + " TASKS"}
              </div>
            </div>

            <div className="mx-3" style={{ display: isStoriesOpen ? "inline-block" : "none", marginLeft: "7px", fontSize: "10px", color: "#959595", fontWeight: "500" }}>
              {stories.length === 1 ? "1 TASK" : stories.length + " TASKS"}
            </div>
          </div>


          <div className="d-flex justify-content-around mx-3" style={{ width: "25%" }}>
            <div className="px-2 py-1" hidden={!isStoriesOpen}>
              Assignee
            </div>

            <div className="px-2 py-1" hidden={!isStoriesOpen}>
              Priority
            </div>

            <div className="px-2 py-1" hidden={!isStoriesOpen} title="Hover the column below">
              Settings
            </div>
          </div>
        </div>

        <div className="w-100">
          {
            isStoriesOpen ?
              <>
                {
                  stories.length ?
                    stories.map((story, index) => {
                      return (
                        <Story
                          key={index}
                          workspaceIndex={workspaceIndex}
                          folderIndex={folderIndex}
                          listIndex={listIndex}
                          storyIndex={index}
                        />
                      );
                    })
                    :
                    <StoryForm
                      workspaceIndex={workspaceIndex}
                      folderIndex={folderIndex}
                      listIndex={listIndex}
                    />
                }
                <div
                  className="m-1 px-2 py-1 rounded-top rounded-bottom text-secondary new-task-btn"
                  hidden={!stories.length || isFormOpen}
                  onClick={() => setIsFormOpen(true)}
                  style={{ width: "fit-content", fontSize: "12px", cursor: "pointer" }}
                >
                  + New Task
                </div>

                <div hidden={!isFormOpen}>
                  <StoryForm
                    inputActive
                    setIsFormOpen={setIsFormOpen}
                    workspaceIndex={workspaceIndex}
                    folderIndex={folderIndex}
                    listIndex={listIndex}
                  />
                </div>
              </>
              :
              null
          }
        </div>
      </div>
    </div>
  );
}
