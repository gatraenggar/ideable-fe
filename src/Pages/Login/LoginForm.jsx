import { useState } from 'react'
import IdeableLogo from '../../Assets/ideable-logo.svg'
import validator from '../../Utils/validator'
import HttpPostLogin from '../../API/LoginAPI'

export default function LoginForm () {
    const [form, setForm] = useState({
        email: "m.gatraenggar@gmail.com",
        password: "abcd1234",
    })
    const [isEmailValid, setIsEmailValid] = useState(true)
    const [isPasswordValid, setIsPasswordValid] = useState(true)

    const login = async (e) => {
        e.preventDefault()
        
        setIsEmailValid(validator.isEmail(form.email))
        setIsPasswordValid(validator.isPassword(form.password))

        if (validator.isEmail(form.email) && validator.isPassword(form.password)) {
            const res = await HttpPostLogin(form)
            console.log(res)
            
            window.location.href = '/dashboard'
        }
    }

    return(
        <>
            <form className="w-75 p-3">
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
                    <input type="password" className="form-control" onChange={(e) => setForm({...form, password: e.target.value}) } />
                    
                    <div className="mt-1 text-danger" hidden={isPasswordValid}>
                        *Password must be at least 8-20 characters
                    </div>
                </div>

                <div>
                    <input 
                        className="btn btn-primary w-100" type="submit" value="Login"
                        onClick={(e) => login(e)}
                    />
                </div>

                <div className="d-flex flex-row my-4 align-items-center">
                    <hr className="border border-secondary w-100" />
                    <div className="text-center w-100"> or </div>
                    <hr className="border border-secondary w-100" />
                </div>

                <input
                    type="submit"
                    value="Sign in with Google"
                    className="btn btn-outline-primary w-100 mb-5"
                    onClick={(e) => e.preventDefault()}
                />

                <div className="text-center">
                    <span>Don't have an account? </span>
                    <span className="text-primary text-clickable">Sign Up</span>
                </div>
            </form>
        </>
    )
}
