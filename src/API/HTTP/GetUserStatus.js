import { httpURI } from "../../Constants/httpURI"
/**
 * @param form Javascript object
 * @returns JSON
 */
 const httpGetUserStatus = async () => {
    return await fetch(`${httpURI}/v1/auth/user-status`, {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
        },
        credentials: 'include'
    })
    .then(async (res) => await res.json())
    .catch((error)=> error)
}

export default httpGetUserStatus
