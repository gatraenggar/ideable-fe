import { httpURI } from "../../Constants/httpURI"
/**
 * @param form Javascript object
 * @returns JSON
 */
 const httpPostLogout = async () => {
    const response = await fetch(`${httpURI}/v1/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        credentials: 'include',
    })
    .then((res)=> res)
    .catch((error)=> error)

    return response
}

export default httpPostLogout
