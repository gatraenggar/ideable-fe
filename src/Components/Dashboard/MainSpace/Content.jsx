import { useContext } from "react";
import { WorkspaceContext } from "../../../Pages/Dashboard";
import Workspace from "./Contents/Workspace";

export default function Content() {
  const { workspaces } = useContext(WorkspaceContext);

  return (
    <div className="px-5 py-4 sidebar-workspace-scroller" style={{ height: "92vh", backgroundColor: "#eeeeee" }}>
      {
        workspaces.map(({ name }, index) => {
          return (
            <Workspace key={index} workspaceIndex={index} workspaceTitle={name} />
          );
        })
      }
    </div>
  );
}
