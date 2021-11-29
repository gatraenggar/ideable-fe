import { httpURI } from "../../Constants/httpURI"
/**
 * @param form Javascript object
 * @returns JSON
 */
 const httpPostLogin = async (form) => {
    const response = await fetch(`${httpURI}/v1/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(form),
        credentials: 'include',
    })
    .then((res)=> res)
    .catch((error)=> error)

    return response
}

export default httpPostLogin
