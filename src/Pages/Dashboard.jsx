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
        fetchAllContents()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchAllContents = async () => {
        try {
            const workspaces = await httpGetWorkspaces();
            if (!Array.isArray(workspaces) || !workspaces.length) return

            const workspaceIDs = workspaces.map(({ uuid }) => uuid)
            const folders = await httpGetFolders(workspaceIDs);
            if (!Array.isArray(folders) || !folders.length) return

            const lists = await httpGetLists(workspaceIDs, folders.map(({ uuid }) => uuid))
            if (!Array.isArray(lists) || !lists.length) return

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
        <WorkspaceContext.Provider value={{ workspaces }}>
            <div className="d-flex" style={{ height: "100vh" }}>
                <Sidebar 
                    showTab={showTab}
                    setShowTab={(currentShowTab) => setShowTab(currentShowTab)}
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
