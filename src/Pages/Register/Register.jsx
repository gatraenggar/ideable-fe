import RegisterForm from "./RegisterForm";
import RowSeparatorLine from "../../Components/RowSeparatorLine";
import GoogleButton from "../../Components/GoogleButton";
import IdeableLogo from '../../Assets/ideable-logo.svg'

export default function Register() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <div className="pt-4 px-5 shadow" style={{minWidth:"32vw", maxWidth: "450px"}}>
                <div className="d-flex justify-content-center align-items-center mt-2 mb-4" style={{marginRight: "15px"}}>
                    <img src={IdeableLogo} alt="Ideable Logo" style={{ width: "100px", }} />
                    <div className="px-1 fs-4">Software Management</div>
                </div>

                <RegisterForm/>
                <RowSeparatorLine/>
                <GoogleButton/>
            </div>
        </div>
    )
}
