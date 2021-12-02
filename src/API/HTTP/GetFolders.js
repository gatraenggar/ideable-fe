import { httpURI } from "../../Constants/httpURI"
/**
 * @param form Javascript object
 * @returns JSON
 */
 const httpGetFolders = async (workspaceIDs) => {
    const response = await fetch(`${httpURI}/v1/workspaces/folders?workspace_ids=${workspaceIDs}`, {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
        },
        credentials: 'include',
    })
    .then((res)=> res)
    .catch((error)=> error)

    return response
}

export default httpGetFolders
