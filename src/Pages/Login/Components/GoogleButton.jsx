import { useEffect } from 'react';
import { attachGoogleSign } from '../../../HttpAPI/PostGoogleOAuth';
import GoogleImage from '../../../Assets/google.png';

export default function GoogleButton() {
    useEffect(() => {
        attachGoogleSign(document.getElementById('google-sign-button'))
    }, []);

    return (
        <div id="google-sign-button" className="d-flex flex-row justify-content-center align-items-center btn btn-outline-primary w-100 mb-5">
            <div style={{
                background: `url(${GoogleImage})`,
                backgroundSize: "cover",
                display: "inline-block",
                verticalAlign: "middle",
                width: "20px",
                height: "20px",
            }}>
            </div>

            <div className="mx-2">
                Sign in with Google
            </div>
        </div>
    );
}
