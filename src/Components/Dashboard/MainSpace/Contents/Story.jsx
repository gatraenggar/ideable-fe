import { useState } from "react";
import { AssigneeIcon, DropdownArrowIcon, PriorityFlag, ItemBranchIcon } from "./Utils";

function ListItem({ item, isItemOpen, setIsItemOpen, childItem = false }) {
  const priorityColor = {
    1: 'lightgrey',
    2: 'yellow',
    3: 'red',
  };
  return (
    <div className="d-flex justify-content-between px-3 py-2 bg-white">
      <div>
        <div style={{ display: "inline-block", position: "relative", top: "-1px", width: "10px" }}>
          <span hidden={childItem || !item.tasks.length} style={{ cursor: "pointer" }} onClick={() => setIsItemOpen(!isItemOpen)}>
            <DropdownArrowIcon isOpen={isItemOpen} width={10} height={10} noBorder />
          </span>
        </div>

        <div className={childItem ? "mx-3" : "mx-2"} style={{ display: "inline-block" }}>
          {
            childItem ?
              <span> &#9643; &nbsp; {item.title} </span>
              :
              <>
                <span> {item.title} </span>

                <span className="mx-1 px-1 border rounded-top rounded-bottom" hidden={!item.tasks.length} style={{ display: "inline-block", cursor: "pointer" }}>
                  <span onClick={() => setIsItemOpen(!isItemOpen)}>
                    <ItemBranchIcon />

                    <span className="fw-bold" style={{ marginRight: "3px", fontSize: "13.5px", color: "#7d838e" }}>
                      {item.tasks.length}
                    </span>
                  </span>

                  <span style={{ display: "inline-block", borderLeft: "solid 1px lightgrey", height: "10px", marginLeft: "5px" }}>
                  </span>

                  <span className="text-secondary"> + </span>
                </span>
              </>
          }
        </div>
      </div>

      <div className="d-flex justify-content-around" style={{ width: "16%" }}>
        <span className="mx-1">
          <AssigneeIcon />
        </span>

        <span className="mx-1">
          <PriorityFlag color={priorityColor[item.priority]} />
        </span>
      </div>
    </div>
  );
}

export default function Story({ story }) {
  const [isItemOpen, setIsItemOpen] = useState(false);

  return (
    <>
      <ListItem item={story} isItemOpen={isItemOpen} setIsItemOpen={setIsItemOpen} />

      <div className="w-100">
        {
          isItemOpen ?
            story.tasks.map((task, index) => {
              return (
                <div key={index}>
                  <ListItem item={task} childItem />
                </div>
              );
            })
            :
            null
        }
      </div>
    </>
  );
}
