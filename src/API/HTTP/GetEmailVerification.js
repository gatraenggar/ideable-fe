import { httpURI } from "../../Constants/httpURI"
/**
 * @param form Javascript object
 * @returns JSON
 */
 const httpGetEmailVerification = async (authToken) => {
    const response = await fetch(`${httpURI}/v1/auth/email-verification/${authToken}`, {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
        },
        credentials: 'include',
    })
    .then((res)=> res)
    .catch((error)=> error)

    return response
}

export default httpGetEmailVerification
