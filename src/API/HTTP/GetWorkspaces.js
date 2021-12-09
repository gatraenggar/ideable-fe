import { httpURI } from "../../Constants/httpURI"
import httpGetAccessToken from "./GetAccessToken"
/**
 * @param form Javascript object
 * @returns JSON
 */
 const httpGetWorkspaces = async () => {
    const response = await fetch(`${httpURI}/v1/workspaces`, {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
        },
        credentials: 'include',
    })
    .then((res) => res)
    .catch((error) => error)

    const responseJSON = await response.json();

    if (responseJSON.message === "Token has expired") {
        await httpGetAccessToken()
        return httpGetWorkspaces()
    }

    if (responseJSON.status === "failed") {
        alert(responseJSON.message)
        return []
    }

    return responseJSON.data
}

export default httpGetWorkspaces
