import { useState } from "react";
import { WorkspaceContext } from "../../../Pages/Dashboard";
import httpPostFolder from "../../../API/HTTP/PostFolder";

export default function FolderForm({
  isFolderFormOpen,
  setIsFolderFormOpen,
  workspaceID,
}) {
  const [folderName, setFolderName] = useState("");

  const createFolder = async (event, workspaceID, fetchContents) => {
      event.preventDefault();

      const httpResponse = await httpPostFolder({ name: folderName.trim() }, workspaceID);
      alert(httpResponse.message);

      if (httpResponse.status !== "success") return;

      await fetchContents();

      setFolderName("");
      setIsFolderFormOpen(!isFolderFormOpen);
  };

  return (
      <WorkspaceContext.Consumer>
          {
              ({ fetchContents }) => (
                  <form>
                      <div className="text-center fs-4 fw-bold mb-4">
                          Create New Folder
                      </div>

                      <label htmlFor="email" className="form-label">
                          Folder Name
                      </label>

                      <input
                          type="text"
                          className="form-control"
                          value={folderName}
                          onChange={(e) => setFolderName(e.target.value)}
                      />

                      <button
                          type="submit"
                          onClick={async (e) => createFolder(e, workspaceID, fetchContents)}
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
