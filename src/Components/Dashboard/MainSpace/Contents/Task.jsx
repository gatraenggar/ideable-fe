import { AssigneeIcon, PriorityFlag } from "./Utils";

export default function Task({ task }) {
  const priorityColor = {
    1: 'lightgrey',
    2: 'yellow',
    3: 'red',
  };

  return (
    <div className="d-flex justify-content-between px-3 py-2 bg-white">
      <div>
        <div className={"mx-4"} style={{ display: "inline-block" }}>
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
