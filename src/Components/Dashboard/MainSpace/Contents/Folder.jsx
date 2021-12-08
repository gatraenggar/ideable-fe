import { WorkspaceContext } from "../../../../Pages/Dashboard";
import { useContext } from "react";
import List from "./List";

export default function Folder({
  workspaceTitle,
  workspaceIndex,
  folderTitle,
  folderIndex,
}) {
  const { workspaces } = useContext(WorkspaceContext);

  return (
    <div key={folderIndex}>
      <div className="">
        {workspaceTitle} &gt; {folderTitle}
      </div>

      {
        workspaces[workspaceIndex].folders[folderIndex].lists.map(({ name: listTitle }, listIndex) => {
          return (
            <div key={listIndex} >
              <List
                title={listTitle}
                workspaceIndex={workspaceIndex}
                folderIndex={folderIndex}
                listIndex={listIndex}
              />
            </div>
          );
        })
      }
    </div>
  );
}
