import { useContext, useEffect, useRef, useState } from "react";
import { AssigneeIcon, PriorityFlag, SettingGear } from "./Utils";
import { WorkspaceContext } from "../../../../Pages/Dashboard";
import httpPostStory from "../../../../API/HTTP/PostStory";

export default function StoryForm({
  inputActive = false,
  setIsFormOpen = () => { },
  workspaceIndex,
  folderIndex,
  listIndex,
  setIsStoryFetched,
}) {
  const { workspaces } = useContext(WorkspaceContext);
  const [isInputting, setIsInputting] = useState(inputActive ? true : false);
  const [storyName, setStoryName] = useState(inputActive ? "" : "Add New Story");
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputActive) inputRef.current.focus();
  });

  const createStory = async (event, workspaceID, listID) => {
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

    setStoryName("");
    setIsInputting(false);
    setIsFormOpen(false);
    setIsStoryFetched(false);
  };

  return (
    <div className={`d-flex justify-content-between px-3 py-2 bg-white ${isInputting || inputActive ? "border border-success" : null}`}>
      <div style={{ display: "inline-block", width: "75%", }}>
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
