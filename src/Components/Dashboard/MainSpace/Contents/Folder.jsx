import { WorkspaceContext } from "../../../../Pages/Dashboard";
import { useContext } from "react";
import List from "./List"

export default function Folder({ workspaceIndex, workspaceTitle }) {
  const { workspaces } = useContext(WorkspaceContext);

  if (workspaces[workspaceIndex].hasOwnProperty("folders") ) {
    return workspaces[workspaceIndex].folders.map(({ name: folderTitle }, folderIndex) => {
      return (
        <div key={folderIndex}>
          <div className="">
            {workspaceTitle} &gt; {folderTitle}
          </div>
  
          {
            workspaces[workspaceIndex].folders[folderIndex].lists.map(({ name: listTitle }, listIndex) => {
              return (
                <div key={listIndex} >
                  <List title={listTitle} workspaceIndex={workspaceIndex} folderIndex={folderIndex} listIndex={listIndex} />
                </div>
              );
            })
          }
        </div>
      );
    });
  }

  return (
    <div> Loading </div>
  )
}
