import { httpURI } from "../../Constants/httpURI"
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
    .then((res)=> res)
    .catch((error)=> error)

    return response
}

export default httpGetWorkspaces
