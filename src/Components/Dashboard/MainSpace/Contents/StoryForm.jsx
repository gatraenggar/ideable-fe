import { useContext, useEffect, useRef, useState } from "react";
import { AssigneeIcon, PriorityFlag } from "./Utils";
import { WorkspaceContext } from "../../../../Pages/Dashboard";
import httpPostStory from "../../../../API/HTTP/PostStory";

export default function StoryForm({
  inputActive = false,
  setIsFormOpen = () => { },
  workspaceIndex,
  folderIndex,
  listIndex,
}) {
  const { workspaces } = useContext(WorkspaceContext);
  const [isInputting, setIsInputting] = useState(inputActive ? true : false);
  const [storyName, setStoryName] = useState(inputActive ? "" : "Add New Story");
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputActive) inputRef.current.focus();
  });

  const createStory = async (event, workspaceID, listID, fetchContents) => {
    event.preventDefault();
    if (storyName.length < 3 || storyName.length > 80) {
      alert("Title length should be 1-80 characters");
      return;
    }

    const httpResponse = await httpPostStory({ name: storyName.trim() }, workspaceID, listID);

    if (httpResponse.status !== "success") {
      alert(httpResponse.message);
      return;
    }

    await fetchContents();

    setStoryName("");
    setIsInputting(false);
    setIsFormOpen(false);
  };

  return (
    <div className={`d-flex justify-content-between px-3 py-2 bg-white ${isInputting || inputActive ? "border border-success" : null}`}>
      <WorkspaceContext.Consumer>
        {
          ({ fetchContents }) => (
            <div style={{ display: "inline-block", width: "85%", }}>
              &#9643; &nbsp;

              <input
                type="text"
                autoComplete="off"
                ref={inputRef}
                name="story"
                id="story"

                value={storyName}
                onChange={(e) => setStoryName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') createStory(
                    e,
                    workspaces[workspaceIndex].uuid,
                    workspaces[workspaceIndex].folders[folderIndex].lists[listIndex].uuid,
                    fetchContents,
                  );
                }}
                onClick={() => {
                  if (!isInputting) setStoryName("");
                  setIsInputting(true);
                }}

                style={{
                  width: "85%",
                  outline: "none",
                  border: "none",
                  color: isInputting || inputActive ? "black" : "lightgrey",
                }}
              />

              <span
                className="btn btn-success mx-1"
                hidden={!isInputting && !inputActive}
                onClick={(e) => createStory(
                  e,
                  workspaces[workspaceIndex].uuid,
                  workspaces[workspaceIndex].folders[folderIndex].lists[listIndex].uuid,
                  fetchContents,
                )}
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
                  if (!inputActive) setStoryName("Add New Story");
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
          )
        }
      </WorkspaceContext.Consumer>


      <div className="d-flex justify-content-around" style={{ width: "16%" }}>
        <span className="mx-1">
          <AssigneeIcon />
        </span>

        <span className="mx-1">
          <PriorityFlag color={"lightgrey"} />
        </span>
      </div>
    </div>
  );
}
