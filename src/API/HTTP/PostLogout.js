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
    .then(async (res) => await res.json())
    .catch((error)=> error)

    if (response.status === "failed") {
        alert(response.message);
        return;
    }

    localStorage.removeItem("user");

    window.location.href = "/login";
}

export default httpPostLogout
