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
    .then(async (res) => await res.json())
    .catch((error)=> error)

    if (response.status !== "success") { 
        return response
    }

    localStorage.setItem("user", JSON.stringify(response.data));
    window.location.href = "/dashboard"
}

export default httpPostLogin
