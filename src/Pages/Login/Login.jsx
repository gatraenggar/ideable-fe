import LoginForm from "./LoginForm";
import LoginCover from "../../Assets/login-cover.svg"

export default function Login() {
    return (
        <div className="row vh-100" style={{backgroundColor: "#f6faf9"}}>
            <div
                className="d-none d-xl-block"
                style={{
                    position: "absolute",
                    backgroundColor: "#272e78",
                    height: "100vh",
                    width: "20px",
                }}>
            </div>

            <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center align-items-center py-5">
                <LoginForm />
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
    )
}
