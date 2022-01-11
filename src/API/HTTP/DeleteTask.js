import { httpURI } from "../../Constants/httpURI";
/**
 * @param form Javascript object
 * @returns JSON
 */
const httpDeleteTask = async (workspaceID, taskID) => {
    const response = await fetch(`${httpURI}/v1/workspaces/${workspaceID}/folders/lists/stories/tasks/${taskID}`, {
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

export default httpDeleteTask;
