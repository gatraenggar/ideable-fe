import { MenuIcon } from "./Utils";

export default function DashboardWorkspace({ showTab, setShowTab }) {
    return (
        <div className={`${showTab ? "col-10" : "col-12"}`} style={{ backgroundColor: "#eeeeee" }}>
            <div className="d-flex justify-content-between align-items-center px-2 py-3 bg-light">
                <div className="d-flex justify-content-between align-items-center">
                    <div
                        className={`${showTab ? "d-none" : "d-flex mx-3"} justify-content-between align-items-center`}
                        onClick={() => setShowTab(!showTab)}
                    >
                        <MenuIcon />
                    </div>
                    <div className="mx-2 fw-bold" style={{ fontSize: "1.1em" }}>Workspace Name</div>
                    <div className="mx-2" style={{ fontSize: ".92em" }}>List</div>
                    <div className="mx-2" style={{ fontSize: ".92em" }}>Board</div>
                </div>

                <div className="mx-3" style={{ fontSize: ".92em" }}>Share</div>
            </div>
        </div>
    );
}
