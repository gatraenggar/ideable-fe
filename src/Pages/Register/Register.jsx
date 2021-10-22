import RegisterForm from "./RegisterForm";
import RowSeparatorLine from "../../Components/RowSeparatorLine";
import GoogleButton from "../../Components/GoogleButton";
import IdeableLogo from '../../Assets/ideable-logo.svg'

export default function Register() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <div className="pt-4 px-5 shadow" style={{minWidth:"32vw", maxWidth: "450px"}}>
                <RegisterForm/>
                <RowSeparatorLine/>
                <GoogleButton/>
            </div>
        </div>
    )
}
