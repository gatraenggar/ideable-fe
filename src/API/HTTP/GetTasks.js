import { httpURI } from "../../Constants/httpURI";
import httpGetAccessToken from "./GetAccessToken"
/**
 * @param form Javascript object
 * @returns JSON
 */
const httpGetTasks = async (workspaceIDs, storyIDs) => {
    const response = await fetch(
        `${httpURI}/v1/workspaces/folders/lists/stories/tasks?workspace_ids=${workspaceIDs}&story_ids=${storyIDs}`,
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
        return httpGetTasks()
    }

    if (responseJSON.status === "failed") {
        alert(responseJSON.message)
        return []
    }

    return responseJSON.data
};

export default httpGetTasks;
