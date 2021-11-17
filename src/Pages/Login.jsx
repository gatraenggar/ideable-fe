import LoginForm from "../Components/Login/LoginForm";
import LoginCover from "../Assets/login-cover.svg"
import GoogleButton from "../Components/Common/GoogleButton";
import LoginButtonSeparator from "../Components/Common/LoginButtonSeparator";
import { LeftPageOutline, SignUpLink } from "../Components/Login/Utils"

export default function Login() {
    return (
        <div style={{overflow: "hidden"}}>
            <div className="row vh-100" style={{backgroundColor: "#f6faf9",}}>
                <LeftPageOutline/>

                <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center align-items-center py-5">
                    <div className="w-75 p-3">
                        <LoginForm/>
                        <LoginButtonSeparator/>
                        <GoogleButton/>
                        <SignUpLink/>
                    </div>
                </div>

                <div
                    className="col-md-6 col-lg-8 d-none d-md-flex justify-content-end align-items-end pb-2"
                    style={{
                        backgroundImage: `url(${LoginCover})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <span>
                        <a href="http://www.freepik.com" className="mx-3 text-secondary text-decoration-none">
                            Designed by vectorjuice
                        </a>
                    </span>
                </div>
            </div>
        </div>
    )
}
