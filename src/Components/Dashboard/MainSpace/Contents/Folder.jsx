import { useContext } from "react";
import { WorkspaceContext } from "../../../../Pages/Dashboard";
import List from "./List"

export default function Folder({ workspaceIndex, workspaceTitle }) {
  const { workspaces } = useContext(WorkspaceContext);

  if (workspaces[workspaceIndex].hasOwnProperty("folders") ) {
    return workspaces[workspaceIndex].folders.map(({ name: folderTitle }, index) => {
      return (
        <div key={index}>
          <div className="">
            {workspaceTitle} &gt; {folderTitle}
          </div>
  
          {
            workspaces[workspaceIndex].folders[index].lists.map(({ name: listTitle }, index) => {
              return (
                <div key={index} >
                  <List title={listTitle} stories={[]} />
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
