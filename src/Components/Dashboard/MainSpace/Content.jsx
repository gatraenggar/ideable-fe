import { fakeWorkspaces as workspaces } from "../../../Constants/fakeWorkspaces";
import Folder from "./Contents/Folder";

export default function Content() {
  return (
    <div className="px-5 py-4 sidebar-workspace-scroller" style={{ height: "92vh", backgroundColor: "#eeeeee" }}>
      {
        workspaces.map(({ title, folders }, index) => {
          return (
            <Folder key={index} workspaceTitle={title} workspaceFolders={folders} />
          );
        })
      }
    </div>
  );
}
