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
        body: JSON.stringify(form),
        credentials: 'include',
    })
        .then(async (res) => await res.json())
        .catch((error) => error);

    if (response.status !== "success") { 
        return response
    }

    localStorage.setItem("user", JSON.stringify(response.data));
    if (response.status === "success") alert("We've send you a verification email")

    window.location.href = "/dashboard"
};

export default httpPostRegister;
