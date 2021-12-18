import { useState } from 'react'
import httpPostLogin from '../../API/HTTP/PostLogin'
import IdeableLogo from '../../Assets/ideable-logo.svg'
import Validator from '../../Utils/validator'

export default function LoginForm () {
    const [form, setForm] = useState({
        email: "",
        password: "",
    })
    const [isEmailValid, setIsEmailValid] = useState(true)
    const [isPasswordValid, setIsPasswordValid] = useState(true)
    const [isHttpLoading, setIsHttpLoading] = useState(false)
    const [httpError, setHttpError] = useState("")

    const login = async (e) => {
        e.preventDefault()
        
        setIsEmailValid(Validator.isEmail(form.email))
        setIsPasswordValid(form.password !== "")
        if (form.password === "") return

        if (Validator.isEmail(form.email)) {
            setIsHttpLoading(true)
            const httpResponse = await httpPostLogin(form)
            setIsHttpLoading(false)

            if (httpResponse.status === "success") { 
                setHttpError("")
                localStorage.setItem("user", JSON.stringify(httpResponse.data));
                window.location.replace("/dashboard")
            } else {
                setHttpError(httpResponse.message)
            }
        }
    }

    return(
        <form>
            <div className="d-flex justify-content-start align-items-center mb-2">
                <img src={IdeableLogo} alt="Ideable Logo" className="w-25"/>
                <div className="px-1 fs-6">SIGN IN TO YOUR ACCOUNT</div>
            </div>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" onChange={(e) => setForm({...form, email: e.target.value.trim()}) } />

                <div className="mt-1 text-danger" hidden={isEmailValid}>
                    *Email is not valid
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" autoComplete="" onChange={(e) => setForm({...form, password: e.target.value}) } />
                
                <div className="mt-1 text-danger" hidden={isPasswordValid}>
                    *Password can't be empty
                </div>
            </div>

            <div>
                <button className="btn btn-primary w-100" type="submit" onClick={(e) => login(e)} disabled={ isHttpLoading }>
                    { isHttpLoading? "Loading..." : "Login" }
                </button>
                <div className="mt-2 text-center text-danger" hidden={httpError === "" || isHttpLoading}>
                    { httpError }
                </div>
            </div>
        </form>
    )
}
