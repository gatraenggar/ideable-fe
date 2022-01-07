import { WorkspaceContext } from "../../../../Pages/Dashboard";
import { useContext, useState } from "react";
import List from "./List";
import ListFormLayer from "../../Components/ListFormLayer";

export default function Folder({
  workspaceTitle,
  workspaceIndex,
  folderTitle,
  folderIndex,
  currentListIdx,
}) {
  const { workspaces } = useContext(WorkspaceContext);
  const [isListFormOpen, setIsListFormOpen] = useState(false);

  return (
    <div key={folderIndex}>
      <div className="">
        {workspaceTitle} &gt; {folderTitle}
      </div>

      {
        workspaces[workspaceIndex].folders[folderIndex].lists.length ?
          workspaces[workspaceIndex].folders[folderIndex].lists.map(({ name: listTitle }, listIndex) => {
            return (
              (currentListIdx !== null && listIndex === currentListIdx)
                || currentListIdx === null ?
                <div key={listIndex} >
                  <List
                    title={listTitle}
                    workspaceIndex={workspaceIndex}
                    folderIndex={folderIndex}
                    listIndex={listIndex}
                  />
                </div>
                :
                null
            );
          })
          :
          <div className="d-flex gap-2 w-100 p-3 text-secondary">
            <div>
              You have no list in this folder.
            </div>

            <button
              className="btn btn-secondary"
              onClick={() => setIsListFormOpen(true)}
              style={{ height: "25px", padding: "0 5px", fontSize: "12px" }}
            >
              Create List
            </button>

            <ListFormLayer
              isListFormOpen={isListFormOpen}
              setIsListFormOpen={setIsListFormOpen}
              workspaceID={workspaces[workspaceIndex].uuid}
              folderID={workspaces[workspaceIndex].folders[folderIndex].uuid}
            />
          </div>
      }
    </div>
  );
}
