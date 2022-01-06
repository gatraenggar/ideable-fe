import FolderForm from './FolderForm';

export default function FolderFormLayer({
  isFolderFormOpen,
  setIsFolderFormOpen,
  workspaceID,
}) {
  return (
      <>
          <div
              hidden={!isFolderFormOpen}
              onClick={() => setIsFolderFormOpen(!isFolderFormOpen)}
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
              className={`${isFolderFormOpen ? "d-flex" : "d-none"} justify-content-center align-items-center rounded bg-white`}
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
                  <FolderForm
                      isFolderFormOpen={isFolderFormOpen}
                      setIsFolderFormOpen={setIsFolderFormOpen}
                      workspaceID={workspaceID}
                  />
              </div>
          </div>
      </>
  );
}
