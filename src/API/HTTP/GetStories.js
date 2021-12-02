import { httpURI } from "../../Constants/httpURI";
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

    return response;
};

export default httpGetStories;
