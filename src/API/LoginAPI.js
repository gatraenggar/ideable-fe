/**
 * @param form Javascript object
 * @returns JSON
 */
 export default async function HttpPostLogin(form) {
    const response = await fetch('http://localhost:8080/v1/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(form),
    })
    .then((res)=> res.json())
    .catch((error)=> error)

    return response
}
