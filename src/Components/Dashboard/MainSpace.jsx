import Content from "./MainSpace/Content";
import Navbar from "./MainSpace/Navbar";

export default function MainSpace({
    showTab,
    setShowTab,
    currentWorkspaceIdx,
    currentFolderIdx,
    currentListIdx,
}) {
    return (
        <div className={`${showTab ? "col-10" : "col-12"}`}>
            <Navbar showTab={showTab} setShowTab={setShowTab} />
            <Content
                currentWorkspaceIdx={currentWorkspaceIdx}
                currentFolderIdx={currentFolderIdx}
                currentListIdx={currentListIdx}
            />
        </div>
    );
}
