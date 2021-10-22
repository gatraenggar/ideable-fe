export const LeftPageOutline = () =>{
    return(
        <div
            className="d-none d-xl-block"
            style={{
                position: "absolute",
                backgroundColor: "#272e78",
                height: "100vh",
                width: "20px",
            }}>
        </div>
    )
}

export const SignUpLink = () => {
    return(
        <div className="text-center">
            <span>Don't have an account? </span>
            
            <span
                className="text-primary text-clickable" 
                onClick={() => window.location.href = '/register'}
            >
                Sign Up
            </span>
        </div>
    )
}
