import { useContext, useEffect, useState } from "react";
import { WorkspaceContext } from "../../../../Pages/Dashboard";
import { ListIcon } from "../../Utils";
import httpDeleteList from "../../../../API/HTTP/DeleteList";

export default function List({
  isDarkTab,
  workspaceIndex,
  folderIndex,
  listIndex,
  listTitle,

  currentWorkspaceIdx,
  currentFolderIdx,
  currentListIdx,

  setCurrentWorkspaceIdx,
  setCurrentFolderIdx,
  setCurrentListIdx,
}) {
  const { workspaces } = useContext(WorkspaceContext);
  const [isOptionOpen, setIsOptionOpen] = useState(false);

  useEffect(() => {
    if (
      (currentWorkspaceIdx !== workspaceIndex) ||
      (currentWorkspaceIdx === workspaceIndex && currentFolderIdx !== folderIndex) ||
      (currentWorkspaceIdx === workspaceIndex && currentFolderIdx === folderIndex && currentListIdx !== listIndex)
    ) setIsOptionOpen(false);
  }, [
    currentWorkspaceIdx,
    workspaceIndex,
    currentFolderIdx,
    folderIndex,
    currentListIdx,
    listIndex,
  ]);

  const deleteList = async (workspaceID, listID, fetchContents) => {
    if (!window.confirm("Are you sure to delete this list?")) return;

    const httpResponse = await httpDeleteList(workspaceID, listID);
    alert(httpResponse.message);

    if (httpResponse.status !== "success") return;

    await fetchContents();
    setCurrentWorkspaceIdx(null);
    setCurrentFolderIdx(null);
    setCurrentListIdx(null);
  };

  return (
    <div
      key={listIndex}
      className="d-flex justify-content-between align-items-center px-1 hover-trigger text-clickable"
      style={{ marginLeft: "60px", marginBottom: "6px", fontSize: "0.9em" }}
      onClick={() => {
        setCurrentWorkspaceIdx(workspaceIndex);
        setCurrentFolderIdx(folderIndex);
        setCurrentListIdx(listIndex);
      }}
    >
      <div>
        <ListIcon />
        <span className="mx-2"> {listTitle} </span>

        <WorkspaceContext.Consumer>
          {({ fetchContents }) => (
            <div className={isDarkTab ? "dark-dropdown-content" : "light-dropdown-content"} hidden={!isOptionOpen} >
              <div onClick={() => { }}>
                + Add Story
              </div>

              <div>
                ~ Change List Name
              </div>

              <div
                onClick={() => deleteList(
                  workspaces[workspaceIndex].uuid,
                  workspaces[workspaceIndex].folders[folderIndex].lists[listIndex].uuid,
                  fetchContents
                )}
              >
                -- Delete List
              </div>
            </div>
          )}
        </WorkspaceContext.Consumer>
      </div>

      <div
        className="mx-1 display-on-hover"
        onClick={() => setIsOptionOpen(!isOptionOpen)}
        style={{ cursor: "pointer" }}
      >
        ?
      </div>
    </div>
  );
}
