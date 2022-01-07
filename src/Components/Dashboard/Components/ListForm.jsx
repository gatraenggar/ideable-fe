import { useState } from "react";
import { WorkspaceContext } from "../../../Pages/Dashboard";
import httpPostList from "../../../API/HTTP/PostList";

export default function ListForm({
  isListFormOpen,
  setIsListFormOpen,
  workspaceID,
  folderID,
}) {
  const [listName, setListName] = useState("");

  const createList = async (event, workspaceID, folderID, fetchContents) => {
      event.preventDefault();

      const httpResponse = await httpPostList({ name: listName.trim() }, workspaceID, folderID);
      alert(httpResponse.message);

      if (httpResponse.status !== "success") return;

      await fetchContents();

      setListName("");
      setIsListFormOpen(!isListFormOpen);
  };

  return (
      <WorkspaceContext.Consumer>
          {
              ({ fetchContents }) => (
                  <form>
                      <div className="text-center fs-4 fw-bold mb-4">
                          Create New List
                      </div>

                      <label htmlFor="email" className="form-label">
                          List Name
                      </label>

                      <input
                          type="text"
                          className="form-control"
                          value={listName}
                          onChange={(e) => setListName(e.target.value)}
                      />

                      <button
                          type="submit"
                          onClick={async (e) => createList(e, workspaceID, folderID, fetchContents)}
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
