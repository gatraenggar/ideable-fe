import Navbar from "./MainSpace/Navbar";

export default function DashboardWorkspace({ showTab, setShowTab }) {
    return (
        <div className={`${showTab ? "col-10" : "col-12"}`} style={{ backgroundColor: "#eeeeee" }}>
            <Navbar showTab={showTab} setShowTab={setShowTab} />
        </div>
    );
}
