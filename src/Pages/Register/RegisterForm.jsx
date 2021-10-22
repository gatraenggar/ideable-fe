import { useState } from 'react'
import { httpPostLogin } from '../../HttpAPI/PostLogin'
import Validator from '../../Utils/validator'

export default function LoginForm () {
    const [form, setForm] = useState({
        email: "",
        password: "",
    })
    const [isEmailValid, setIsEmailValid] = useState(true)
    const [isPasswordValid, setIsPasswordValid] = useState(true)

    const login = async (e) => {
        e.preventDefault()
        
        setIsEmailValid(Validator.isEmail(form.email))
        setIsPasswordValid(Validator.isPassword(form.password))

        if (Validator.isEmail(form.email) && Validator.isPassword(form.password)) {
            const httpResponse = await httpPostLogin(form)
            console.log(httpResponse)
        }
    }

    return(
        <form>
            <div className="d-flex flex-column justify-content-center align-items-center mb-3">
                <div className="px-1 fs-4 fw-bold">Lets Join Now</div>
                <div className="px-1 fs-6">
                    <span> Already have an account? </span>
                    <span className="text-decoration-underline text-clickable" onClick={() => window.location.href = '/login'}>
                        Sign-in
                    </span>
                </div>
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
                    className="btn btn-primary w-100 mt-2" type="submit" value="Register"
                    onClick={(e) => login(e)}
                />
            </div>
        </form>
    )
}
