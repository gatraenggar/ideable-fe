import { httpURI } from "../../Constants/httpURI";
/**
 * @param form Javascript object
 * @returns JSON
 */
const httpDeleteFolder = async (workspaceID, folderID) => {
    const response = await fetch(`${httpURI}/v1/workspaces/${workspaceID}/folders/${folderID}`, {
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

export default httpDeleteFolder;
