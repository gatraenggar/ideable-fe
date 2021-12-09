import { httpURI } from "../../Constants/httpURI"
import httpPostLogout from "./PostLogout"
/**
 * @param form Javascript object
 * @returns JSON
 */
 const httpGetAccessToken = async () => {
    const response = await fetch(`${httpURI}/v1/auth`, {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
        },
        credentials: 'include'
    })
    .then((res)=> res)
    .catch((error)=> error)

    const responseJSON = await response.json()
    if (responseJSON.message === "Re-login required") {
        alert("Your session has ended, please re-login")
        await httpPostLogout();
    }
}

export default httpGetAccessToken
