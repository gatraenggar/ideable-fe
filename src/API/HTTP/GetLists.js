import { httpURI } from "../../Constants/httpURI";
/**
 * @param form Javascript object
 * @returns JSON
 */
const httpGetLists = async (workspaceIDs, folderIDs) => {
    const response = await fetch(
        `${httpURI}/v1/workspaces/folders/lists?workspace_ids=${workspaceIDs}&folder_ids=${folderIDs}`,
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

export default httpGetLists;
