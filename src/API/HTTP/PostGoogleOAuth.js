import { httpURI } from "../../Constants/httpURI";
/**
 * @param form Javascript object
 * @returns JSON
 */
const httpPostGoogleOAuth = async (form) => {
    const response = await fetch(`${httpURI}/v1/oauth/google/login/callback`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
        credentials: 'include',
    })
        .then((res) => res)
        .catch((error) => error);

    return response;
};

/**
 * loads the necessary JavaScript library needed to use Google API.
 */
const loadGoogleScript = () => {
    const id = 'google-js';
    const firstJs = document.getElementsByTagName('script')[0];

    if (document.getElementById(id)) { return; }

    const js = document.createElement('script');
    js.id = id;
    js.src = 'https://apis.google.com/js/platform.js';
    js.onload = window.onGoogleScriptLoad;

    firstJs.parentNode.insertBefore(js, firstJs);
};

/**
 * Attach Google sign-in functionality to component
 * @param googleSignButton The DOM of the Google sign button. 
 * Example of the param: document.getElementById('google-sign-button')
 */
export const attachGoogleSign = (googleSignButton) => {
    window.onGoogleScriptLoad = () => {
        const _gapi = window.gapi;

        // used to dynamically load specific JavaScript libraries
        _gapi.load('auth2', () => {
            (async () => {
                const _googleAuth = await _gapi.auth2.init({
                    client_id: '546225265232-mp3mgbavbet3kgg8g59n81bhuljcl7k3.apps.googleusercontent.com'
                });

                _googleAuth.attachClickHandler(googleSignButton, {},
                    async function (googleUser) {
                        const profile = googleUser.getBasicProfile();

                        const payload = {
                            "email": profile.getEmail(),
                            "first_name": profile.getGivenName(),
                            "last_name": profile.getFamilyName(),
                        };

                        const httpResponse = await httpPostGoogleOAuth(payload);
                        const responseJSON = await httpResponse.json()

                        if (responseJSON.status !== "success") {
                            alert(responseJSON.message);
                            return;
                        }

                        localStorage.setItem("user", JSON.stringify(responseJSON.data));
                        if (httpResponse.status === 201) alert("We've send you a verification email")

                        window.location.replace("/dashboard");

                    }, function (error) {
                        return error;
                    }
                );
            })();
        });
    };

    loadGoogleScript();
};
