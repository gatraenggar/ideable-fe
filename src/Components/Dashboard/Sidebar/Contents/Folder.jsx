import { useContext, useState } from "react";
import { WorkspaceContext } from "../../../../Pages/Dashboard";
import { FolderIcon, ListIcon } from "../../Utils";

export default function Folder({
  folderTitle,
  workspaceIndex,
  folderIndex,
  setCurrentWorkspaceIdx,
  setCurrentFolderIdx,
  setCurrentListIdx,
}) {
  const { workspaces } = useContext(WorkspaceContext);
  const [showList, setShowList] = useState(false);

  return (
      <div>
          <div
              style={{ marginLeft: "30px", marginBottom: "6px", fontSize: "0.9em" }}
              onClick={() => {
                  setShowList(!showList);
                  setCurrentWorkspaceIdx(workspaceIndex);
                  setCurrentFolderIdx(folderIndex);
                  setCurrentListIdx(null);
              }}
          >
              <div className="d-flex justify-content-start align-items-center text-clickable">
                  <FolderIcon isOpen={showList} />
                  <span className="mx-2"> {folderTitle} </span>
              </div>
          </div>
          {
              showList && workspaces[workspaceIndex].folders[folderIndex] ?
                  workspaces[workspaceIndex].folders[folderIndex].lists.map(({ name: listTitle }, titleIndex) => {
                      return (
                          <div
                              key={titleIndex}
                              className="d-flex justify-content-start align-items-center text-clickable"
                              style={{ marginLeft: "60px", marginBottom: "6px", fontSize: "0.9em" }}
                              onClick={() => {
                                  setCurrentWorkspaceIdx(workspaceIndex);
                                  setCurrentFolderIdx(folderIndex);
                                  setCurrentListIdx(titleIndex);
                              }}
                          >
                              <ListIcon />
                              <span className="mx-2"> {listTitle} </span>
                          </div>
                      );
                  })
                  :
                  null
          }
      </div>
  );
}
