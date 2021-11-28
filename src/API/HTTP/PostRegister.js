import { httpURI } from "../../Constants/httpURI";
/**
 * @param form Javascript object
 * @returns JSON
 */
const httpPostRegister = async (form) => {
    const response = await fetch(`${httpURI}/v1/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(form),
    })
        .then((res) => res.json())
        .catch((error) => error);

    return response;
};

export default httpPostRegister;
