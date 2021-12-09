import { httpURI } from "../../Constants/httpURI"
import httpGetAccessToken from "./GetAccessToken"
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

    const responseJSON = await response.json();

    if (responseJSON.message === "Token has expired") {
        await httpGetAccessToken()
        return httpGetFolders()
    }

    if (responseJSON.status === "failed") {
        alert(responseJSON.message)
        return []
    }

    return responseJSON.data
}

export default httpGetFolders
