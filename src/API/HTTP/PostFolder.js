import { httpURI } from "../../Constants/httpURI";
/**
 * @param form Javascript object
 * @returns JSON
 */
const httpPostFolder = async (form, workspaceID) => {
    const response = await fetch(`${httpURI}/v1/workspaces/${workspaceID}/folders`, {
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

export default httpPostFolder;
