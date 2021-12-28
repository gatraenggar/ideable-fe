import { useContext } from "react";
import { WorkspaceContext } from "../../../Pages/Dashboard";
import Workspace from "./Contents/Workspace";

export default function Content({
  currentWorkspaceIdx,
  currentFolderIdx,
  currentListIdx,
}) {
  const { workspaces } = useContext(WorkspaceContext);

  return (
    <div className="px-5 py-4 sidebar-workspace-scroller" style={{ height: "92vh", backgroundColor: "#eeeeee" }}>
      {
        workspaces.length ?
          workspaces.map(({ name }, index) => {
            return (
              (currentWorkspaceIdx !== null && index === currentWorkspaceIdx)
              || currentWorkspaceIdx === null ?
                <Workspace
                  key={index}
                  workspaceIndex={index}
                  workspaceTitle={name}
                  currentWorkspaceIdx={currentWorkspaceIdx}
                  currentFolderIdx={currentFolderIdx}
                  currentListIdx={currentListIdx}
                />
                :
                null
            );
          })
          :
          <h4 className="d-flex justify-content-center align-items-end h-50 py-3 text-secondary">
            Hmm... seems like you have no workspace yet
          </h4>
      }
    </div>
  );
}
