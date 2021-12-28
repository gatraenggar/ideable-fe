import { WorkspaceContext } from "../../../../Pages/Dashboard";
import { useContext } from "react";
import Folder from "./Folder"

export default function Workspace({
  workspaceIndex,
  workspaceTitle,
  currentWorkspaceIdx,
  currentFolderIdx,
  currentListIdx,
}) {
  const { workspaces } = useContext(WorkspaceContext);

  return (
    <>
      {
        workspaces[workspaceIndex].hasOwnProperty("folders")
        && workspaces[workspaceIndex].folders.length ?
          workspaces[workspaceIndex].folders.map(({ name: folderTitle }, folderIndex) => {
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
          })
          :
          currentWorkspaceIdx === null ?
            null
            :
            <h4 className="d-flex justify-content-center align-items-end h-50 py-3 text-secondary text-center">
              Clean like a brand new workspace here...
            </h4>
      }
    </>
  )
}
