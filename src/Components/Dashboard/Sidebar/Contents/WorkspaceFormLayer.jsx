import WorkspaceForm from "./WorkspaceForm";

export default function WorkspaceFormLayer({ isWorkspaceFormOpen, setIsWorkspaceFormOpen }) {
  return (
      <>
          <div
              hidden={!isWorkspaceFormOpen}
              onClick={() => setIsWorkspaceFormOpen(!isWorkspaceFormOpen)}
              style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "100vw",
                  height: "100vh",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  zIndex: 1,
              }}>
          </div>

          <div
              className={`${isWorkspaceFormOpen ? "d-flex" : "d-none"} justify-content-center align-items-center rounded bg-white`}
              style={{
                  position: "absolute",
                  top: "25%",
                  left: "30%",
                  width: "40vw",
                  height: "50%",
                  zIndex: 1,
              }}
          >
              <div style={{ width: "80%" }}>
                  <WorkspaceForm isWorkspaceFormOpen={isWorkspaceFormOpen} setIsWorkspaceFormOpen={setIsWorkspaceFormOpen} />
              </div>
          </div>
      </>
  );
}
