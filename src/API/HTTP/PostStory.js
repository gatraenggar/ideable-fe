import { httpURI } from "../../Constants/httpURI";
/**
 * @param form Javascript object
 * @returns JSON
 */
const httpPostStory = async (form, workspaceID, listID) => {
    const response = await fetch(`${httpURI}/v1/workspaces/${workspaceID}/folders/lists/${listID}/stories`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
        credentials: 'include',
    })
        .then(async (res) => await res.json())
        .catch((error) => error);

    return response
};

export default httpPostStory;
