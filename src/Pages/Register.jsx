import RegisterForm from "../Components/Register/RegisterForm";
import LoginButtonSeparator from "../Components/Common/LoginButtonSeparator";
import GoogleButton from "../Components/Common/GoogleButton";

export default function Register() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{minHeight: "100vh"}}>
            <div className="pt-4 px-5 shadow" style={{minWidth:"32vw", maxWidth: "450px"}}>
                <RegisterForm/>
                <LoginButtonSeparator/>
                <GoogleButton/>
            </div>
        </div>
    )
}
