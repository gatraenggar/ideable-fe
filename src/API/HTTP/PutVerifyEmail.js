import { httpURI } from "../../Constants/httpURI"
/**
 * @param form Javascript object
 * @returns JSON
 */
 const httpPutVerifyEmail = async (authToken) => {
    const response = await fetch(`${httpURI}/v1/auth/email-verification/${authToken}`, {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json',
        },
    })
    .then(async (res) => await res.json())
    .catch((error)=> error)

    return response
}

export default httpPutVerifyEmail
