import { useState } from "react";
import { WorkspaceContext } from "../../../../Pages/Dashboard";
import httpPostWorkspace from "../../../../API/HTTP/PostWorkspace";

export default function WorkspaceForm({
  isWorkspaceFormOpen,
  setIsWorkspaceFormOpen,
}) {
  const [workspaceName, setWorkspaceName] = useState("");

  const createWorkspace = async (event, fetchContents) => {
    event.preventDefault();

    const httpResponse = await httpPostWorkspace({ name: workspaceName.trim() });
    alert(httpResponse.message);

    if (httpResponse.status !== "success") return

    await fetchContents()

    setWorkspaceName("")
    setIsWorkspaceFormOpen(!isWorkspaceFormOpen)
  };

  return (
    <WorkspaceContext.Consumer>
      {
        ({ fetchContents }) => (
          <form>
            <div className="text-center fs-4 fw-bold mb-4">
              Create New Workspace
            </div>

            <label htmlFor="email" className="form-label">
              Workspace Name
            </label>

            <input
              type="text"
              className="form-control"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
            />

            <button
              type="submit"
              onClick={(e) => createWorkspace(e, fetchContents)}
              className="btn btn-primary w-100 mt-4"
            >
              Create
            </button>
          </form>
        )
      }
    </WorkspaceContext.Consumer>
  );
}