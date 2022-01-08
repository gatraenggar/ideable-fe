import ListForm from './ListForm';

export default function ListFormLayer({
    isListFormOpen,
    setIsListFormOpen,
    workspaceID,
    folderID,
}) {
    return (
        <>
            <div
                hidden={!isListFormOpen}
                onClick={() => setIsListFormOpen(!isListFormOpen)}
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
                className={`${isListFormOpen ? "d-flex" : "d-none"} justify-content-center align-items-center rounded bg-white`}
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
                    <ListForm
                        isListFormOpen={isListFormOpen}
                        setIsListFormOpen={setIsListFormOpen}
                        workspaceID={workspaceID}
                        folderID={folderID}
                    />
                </div>
            </div>
        </>
    );
}
