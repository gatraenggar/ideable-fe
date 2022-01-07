import { httpURI } from "../../Constants/httpURI";
/**
 * @param form Javascript object
 * @returns JSON
 */
const httpDeleteList = async (workspaceID, listID) => {
    const response = await fetch(`${httpURI}/v1/workspaces/${workspaceID}/folders/lists/${listID}`, {
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

export default httpDeleteList;
