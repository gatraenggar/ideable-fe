module.exports = {
    isEmail: (email) => {
        return (
            email.length > 4 &&
            email.length < 255 &&
            /^([a-zA-Z0-9_.])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email)
        )
    },
    isPassword: (password) => {
        return (
            password.length > 7 &&
            password.length < 21
        )
    }
}
