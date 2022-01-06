import { useState, createContext, useEffect } from "react";
import Sidebar from "../Components/Dashboard/Sidebar";
import MainSpace from "../Components/Dashboard/MainSpace";
import httpGetWorkspaces from '../API/HTTP/GetWorkspaces';
import httpGetFolders from "../API/HTTP/GetFolders";
import httpGetLists from "../API/HTTP/GetLists";

export const WorkspaceContext = createContext([]);

export default function Dashboard() {
    const [showTab, setShowTab] = useState(true);
    const [workspaces, setWorkspaces] = useState([])
    const [currentWorkspaceIdx, setCurrentWorkspaceIdx] = useState(null)
    const [currentFolderIdx, setCurrentFolderIdx] = useState(null)
    const [currentListIdx, setCurrentListIdx] = useState(null)

    useEffect(() => {
        fetchContents()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchContents = async () => {
        try {
            let workspaces = []
            let folders = []
            let lists = []

            workspaces = await httpGetWorkspaces();
            const workspaceIDs = workspaces.map(({ uuid }) => uuid)

            if (workspaces.length) folders = await httpGetFolders(workspaceIDs);

            if (folders.length) lists = await httpGetLists(workspaceIDs, folders.map(({ uuid }) => uuid))

            const mappedLists = lists.map((list) => ({
                ...list,
                stories: [],
            }))
    
            const mappedFolders = folders.map((folder) => ({
                ...folder,
                lists: mappedLists.filter(({ folder_uuid }) => folder.uuid === folder_uuid)
            }))
    
            const mappedWorkspaces = workspaces.map((workspace) => ({
                ...workspace,
                folders: mappedFolders.filter((folder) => workspace.uuid === folder.workspace_uuid),
            }))
    
            setWorkspaces(mappedWorkspaces)
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <WorkspaceContext.Provider value={{ workspaces, fetchContents }}>
            <div className="d-flex" style={{ height: "100vh" }}>
                <Sidebar 
                    showTab={showTab}
                    setShowTab={(currentShowTab) => setShowTab(currentShowTab)}
                    currentWorkspaceIdx={currentWorkspaceIdx}
                    currentFolderIdx={currentFolderIdx}
                    setCurrentWorkspaceIdx={setCurrentWorkspaceIdx}
                    setCurrentFolderIdx={setCurrentFolderIdx}
                    setCurrentListIdx={setCurrentListIdx}
                />
                <MainSpace 
                    showTab={showTab}
                    setShowTab={(currentShowTab) => setShowTab(currentShowTab)}
                    currentWorkspaceIdx={currentWorkspaceIdx}
                    currentFolderIdx={currentFolderIdx}
                    currentListIdx={currentListIdx}
                />
            </div>
        </WorkspaceContext.Provider>
    );
}
