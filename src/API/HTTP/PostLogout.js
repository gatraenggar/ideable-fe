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

    const responseJSON = await response.json();

    if (responseJSON.status === "failed") {
        alert(responseJSON.message);
        return;
    }

    localStorage.removeItem("user");

    window.location.href = "/login";
}

export default httpPostLogout
