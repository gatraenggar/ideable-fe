import Ideable from '../../Assets/Ideable.svg'

export default function LoginForm () {
    return(
        <>
            <form className="w-75 p-3">
                <div className="d-flex justify-content-start align-items-center mb-2">
                    <img src={Ideable} alt="Ideable Logo" className="w-25"/>
                    <div className="px-1 fs-6">SIGN IN TO YOUR ACCOUNT</div>
                </div>

                <div className="mb-3">
                    <label for="email" className="form-label">Email</label>
                    <input type="email" className="form-control"/>
                </div>
                <div className="mb-4">
                    <label for="password" className="form-label">Password</label>
                    <input type="password" className="form-control"/>
                </div>
                <div>
                    <input 
                        className="btn btn-primary w-100" type="submit" value="Login"
                        onClick={(e) => e.preventDefault()}
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
