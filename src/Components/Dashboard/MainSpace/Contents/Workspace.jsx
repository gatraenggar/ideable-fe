import { WorkspaceContext } from "../../../../Pages/Dashboard";
import { useContext } from "react";
import Folder from "./Folder"

export default function Workspace({
  workspaceIndex,
  workspaceTitle,
  currentFolderIdx,
  currentListIdx,
}) {
  const { workspaces } = useContext(WorkspaceContext);

  if (workspaces[workspaceIndex].hasOwnProperty("folders") ) {
    return workspaces[workspaceIndex].folders.map(({ name: folderTitle }, folderIndex) => {
      return (
        (currentFolderIdx !== null && folderIndex === currentFolderIdx)
        || currentFolderIdx === null ?
          <Folder 
            key={folderIndex}
            workspaceTitle={workspaceTitle}
            workspaceIndex={workspaceIndex}
            folderTitle={folderTitle}
            folderIndex={folderIndex}
            currentListIdx={currentListIdx}
          />
          :
          null
      );
    });
  }

  return (
    <div> Loading </div>
  )
}
