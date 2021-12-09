import { httpURI } from "../../Constants/httpURI";
import httpGetAccessToken from "./GetAccessToken"
/**
 * @param form Javascript object
 * @returns JSON
 */
const httpGetStories = async (workspaceIDs, listIDs) => {
    const response = await fetch(
        `${httpURI}/v1/workspaces/folders/lists/stories?workspace_ids=${workspaceIDs}&list_ids=${listIDs}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        .then((res) => res)
        .catch((error) => error);

    const responseJSON = await response.json();

    if (responseJSON.message === "Token has expired") {
        await httpGetAccessToken()
        return httpGetStories()
    }

    if (responseJSON.status === "failed") {
        alert(responseJSON.message)
        return []
    }

    return responseJSON.data
};

export default httpGetStories;
