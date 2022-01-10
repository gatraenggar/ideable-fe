import { useState } from "react";
import { AssigneeIcon, PriorityFlag, SettingGear } from "./Utils";

export default function Task({ task }) {
  const [isSettingShown, setIsSettingShown] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const priorityColor = {
    1: 'lightgrey',
    2: 'yellow',
    3: 'red',
  };

  return (
    <div
      className="d-flex justify-content-between px-3 py-2 bg-white"
      onMouseEnter={() => setIsSettingShown(true)}
      onMouseLeave={() => { if (!isDropdownOpen) setIsSettingShown(false); }}
    >
      <div style={{ display: "inline-block", width: "75%", textIndent: "4%", }}>
          <span> &#9643; &nbsp; {task.name} </span>
      </div>

      <div className="row row-cols-3 justify-content-center mx-1" style={{ width: "25%" }}>
        <span className="col text-center">
          <AssigneeIcon />
        </span>

        <span className="col text-center">
          <PriorityFlag color={priorityColor[task.priority]} />
        </span>

        <span className="col text-center" style={{ cursor: "pointer" }}>
          {
            isSettingShown ?
              <span onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <SettingGear />
              </span>
              :
              <span> &nbsp; </span>
          }
        </span>
      </div>
    </div>
  );
}
