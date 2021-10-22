import { useState } from 'react'
import { httpPostLogin } from '../../HttpAPI/PostLogin'
import IdeableLogo from '../../Assets/ideable-logo.svg'
import Validator from '../../Utils/validator'

export default function LoginForm () {
    const [form, setForm] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
    })
    const [isEmailValid, setIsEmailValid] = useState(true)
    const [isPasswordValid, setIsPasswordValid] = useState(true)
    const [isNameValid, setIsNameValid] = useState(true)

    const register = async (e) => {
        e.preventDefault()
        
        setIsEmailValid(Validator.isEmail(form.email))
        setIsPasswordValid(Validator.isPassword(form.password))

        if (Validator.isEmail(form.email) && Validator.isPassword(form.password)) {
            // const httpResponse = await httpPostRegister(form)
            // console.log(httpResponse)
        }
    }

    return(
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
                <input type="email" className="form-control" onChange={(e) => setForm({...form, email: e.target.value.trim()}) } />

                <div className="mt-1 text-danger" hidden={isEmailValid}>
                    *Email is not valid
                </div>
            </div>

            <div className="d-flex justify-content-between mb-2">
                <div style={{marginRight: "4px"}}>
                    <label htmlFor="first-name" className="form-label">First Name</label>
                    <input type="text" className="form-control" onChange={(e) => setForm({...form, firstName: e.target.value}) } />
                </div>

                <div style={{marginLeft: "4px"}}>
                    <label htmlFor="last-name" className="form-label">Last Name</label>
                    <input type="text" className="form-control" onChange={(e) => setForm({...form, lastName: e.target.value}) } />
                </div>

                <div className="mt-1 text-danger" hidden={isNameValid}>
                    *Each name has maximum 20 characters
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control mb-2" onChange={(e) => setForm({...form, password: e.target.value}) } />

                <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" onChange={(e) => setForm({...form, confirmPassword: e.target.value}) } />
                
                <div className="mt-1 text-danger" hidden={isPasswordValid}>
                    *Password must be at least 8-20 characters
                </div>
            </div>

            <div>
                <input 
                    className="btn btn-primary w-100 mt-2" type="submit" value="Register"
                    onClick={(e) => register(e)}
                />
            </div>
        </form>
    )
}
