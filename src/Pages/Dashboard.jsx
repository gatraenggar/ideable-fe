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

    useEffect(() => {
        getWorkspaces()
        
        fetchAllContents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getWorkspaces = async () => {
        const httpResponse = await httpGetWorkspaces();
        const responseJSON = await httpResponse.json();
    
        if (responseJSON.status === "failed") throw new Error(responseJSON.message)

        setWorkspaces(responseJSON.data)
        return responseJSON.data
    };

    const getFolders = async (workspaceIDs) => {
        const httpResponse = await httpGetFolders(workspaceIDs);
        const responseJSON = await httpResponse.json();
    
        if (responseJSON.status === "failed") throw new Error(responseJSON.message)

        return responseJSON.data
    }

    const getLists = async (workspaceIDs, folderIDs) => {
        const httpResponse = await httpGetLists(workspaceIDs, folderIDs);
        const responseJSON = await httpResponse.json();
    
        if (responseJSON.status === "failed") throw new Error(responseJSON.message)

        return responseJSON.data
    }

    const fetchAllContents = async () => {
        try {
            const workspaces = await getWorkspaces();
            if (!workspaces.length) return

            const workspaceIDs = workspaces.map(({ uuid }) => uuid)
            const folders = await getFolders(workspaceIDs)
            if (!folders.length) return

            const lists = await getLists(workspaceIDs, folders.map(({ uuid }) => uuid))
            if (!lists.length) return

            const mappedLists = lists.map((list) => ({
                ...list,
                stories: [],
            }))
    
            const folderMap = folders.map((folder) => ({
                ...folder,
                lists: mappedLists.filter(({ folder_uuid }) => folder.uuid === folder_uuid)
            }))
    
            const workspaceMap = workspaces.map((workspace) => ({
                ...workspace,
                folders: folderMap.filter((folder) => workspace.uuid === folder.workspace_uuid),
            }))
    
            setWorkspaces(workspaceMap)
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <WorkspaceContext.Provider value={{ workspaces }}>
            <div className="d-flex" style={{ height: "100vh" }}>
                <Sidebar showTab={showTab} setShowTab={(currentShowTab) => setShowTab(currentShowTab)} />
                <MainSpace showTab={showTab} setShowTab={(currentShowTab) => setShowTab(currentShowTab)} />
            </div>
        </WorkspaceContext.Provider>
    );
}
