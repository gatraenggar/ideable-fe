import { httpURI } from "../../Constants/httpURI";
import httpGetAccessToken from "./GetAccessToken";
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

    const responseJSON = await response.json();

    if (responseJSON.message === "Token has expired") {
        await httpGetAccessToken();
        return httpGetLists();
    }

    if (responseJSON.status === "failed") {
        alert(responseJSON.message);
        return [];
    }

    return responseJSON.data;
};

export default httpGetLists;
