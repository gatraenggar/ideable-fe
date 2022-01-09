import { httpURI } from "../../Constants/httpURI";
/**
 * @param form Javascript object
 * @returns JSON
 */
const httpDeleteStory = async (workspaceID, storyID) => {
    const response = await fetch(`${httpURI}/v1/workspaces/${workspaceID}/folders/lists/stories/${storyID}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .then(async (res) => await res.json())
        .catch((error) => error);

    return response
};

export default httpDeleteStory;
