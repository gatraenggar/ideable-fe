import { useState } from 'react';
import httpPostRegister from '../../API/HTTP/PostRegister';
import IdeableLogo from '../../Assets/ideable-logo.svg';
import Validator from '../../Utils/validator';

export default function RegisterForm() {
    const [form, setForm] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
    });
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isFirstNameValid, setIsFirstNameValid] = useState(true);
    const [isLastNameValid, setIsLastNameValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
    const [isHttpLoading, setIsHttpLoading] = useState(false);
    const [httpError, setHttpError] = useState("");

    const register = async (e) => {
        e.preventDefault();

        setIsEmailValid(Validator.isEmail(form.email));
        setIsFirstNameValid(Validator.isFirstName(form.firstName));
        setIsLastNameValid(Validator.isLastName(form.lastName));
        setIsPasswordValid(Validator.isPassword(form.password));
        setIsConfirmPasswordValid(Validator.isPasswordConfirmed(form.password, form.confirmPassword));

        if (
            Validator.isEmail(form.email) &&
            Validator.isFirstName(form.firstName) &&
            Validator.isLastName(form.lastName) &&
            Validator.isPassword(form.password) &&
            Validator.isPasswordConfirmed(form.password, form.confirmPassword)
        ) {
            setIsHttpLoading(true);
            const httpResponse = await httpPostRegister({
                "email": form.email,
                "first_name": form.firstName,
                "last_name": form.lastName,
                "password": form.password,
            });

            if (httpResponse.status === "failed") { setHttpError(httpResponse.message); }
            else { setHttpError(""); }

            setIsHttpLoading(false);

            localStorage.setItem("user", JSON.stringify(httpResponse.data))
            window.location.replace("/dashboard")
        }
    };

    return (
        <>
            <form>
                <div className="d-flex flex-column justify-content-center align-items-center mb-3">
                    <div className="d-flex flex-row align-items-center px-1 fs-4 fw-bold">
                        <div> Let's Join </div>
                        <img src={IdeableLogo} alt="Ideable Logo" style={{ width: "60px", }} />
                        <div> Now! </div>
                    </div>
                    <div className="px-1 fs-6">
                        <span> Already have an account? </span>
                        <span className="text-decoration-underline text-clickable" onClick={() => window.location.href = '/login'}>
                            Sign-in
                        </span>
                    </div>
                </div>

                <div className="mb-2">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" onChange={(e) => setForm({ ...form, email: e.target.value.trim() })} />

                    <div className="mt-1 text-danger" hidden={isEmailValid}>
                        *Email is not valid
                    </div>
                </div>

                <div className="mb-2">
                    <div className="d-flex justify-content-between">
                        <div style={{ marginRight: "4px" }}>
                            <label htmlFor="first-name" className="form-label">First Name</label>
                            <input type="text" className="form-control" onChange={(e) => setForm({ ...form, firstName: e.target.value.trim() })} />
                        </div>
                        <div style={{ marginLeft: "4px" }}>
                            <label htmlFor="last-name" className="form-label">Last Name</label>
                            <input type="text" className="form-control" onChange={(e) => setForm({ ...form, lastName: e.target.value.trim() })} />
                        </div>
                    </div>

                    <div className="mt-1 text-danger" hidden={isFirstNameValid && isLastNameValid}>
                        *Each name should has 1-20 characters (alphabets & space only)
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control mb-2" autoComplete="" onChange={(e) => setForm({ ...form, password: e.target.value })} />

                    <div className="mt-1 text-danger" hidden={isPasswordValid}>
                        *Password must be at least 8-20 characters
                    </div>

                    <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" autoComplete="" onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} />

                    <div className="mt-1 text-danger" hidden={isConfirmPasswordValid}>
                        *Confirmation password does not match
                    </div>
                </div>

                <div>
                    <button className="btn btn-primary w-100 mt-2" type="submit" onClick={(e) => register(e)} disabled={isHttpLoading}>
                        {isHttpLoading ? "Loading..." : "Register"}
                    </button>
                    <div className="mt-2 text-center text-danger" hidden={httpError === "" || isHttpLoading}>
                        {httpError}
                    </div>
                </div>
            </form>
        </>
    );
}
