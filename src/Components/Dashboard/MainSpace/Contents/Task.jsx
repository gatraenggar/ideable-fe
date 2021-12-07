import { AssigneeIcon, DropdownArrowIcon, PriorityFlag } from "./Utils";

export default function Task({ task, isItemOpen, setIsItemOpen }) {
  const priorityColor = {
    1: 'lightgrey',
    2: 'yellow',
    3: 'red',
  };
  return (
    <div className="d-flex justify-content-between px-3 py-2 bg-white">
      <div>
        <div style={{ display: "inline-block", position: "relative", top: "-1px", width: "10px" }}>
          <span hidden style={{ cursor: "pointer" }} onClick={() => setIsItemOpen(!isItemOpen)}>
            <DropdownArrowIcon isOpen={isItemOpen} width={10} height={10} noBorder />
          </span>
        </div>

        <div className={"mx-3"} style={{ display: "inline-block" }}>
          <span> &#9643; &nbsp; {task.name} </span>
        </div>
      </div>

      <div className="d-flex justify-content-around" style={{ width: "16%" }}>
        <span className="mx-1">
          <AssigneeIcon />
        </span>

        <span className="mx-1">
          <PriorityFlag color={priorityColor[task.priority]} />
        </span>
      </div>
    </div>
  );
}
