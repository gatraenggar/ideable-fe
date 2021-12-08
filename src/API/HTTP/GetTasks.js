import { httpURI } from "../../Constants/httpURI";
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

    return response;
};

export default httpGetTasks;
