const jwt = require("jsonwebtoken")
const createError = require("http-errors")

exports.login = async function (login, password) {
    const isLoginMatch = login === process.env.adminLogin
    const isPasswordMatch = password === process.env.adminPassword

    if (!isLoginMatch || !isPasswordMatch) {
        throw createError(400, 'Некорректный логин и/или пароль')
    }

    const token = jwt.sign(
        { login },
        process.env.jwtSecret,
        { expiresIn: '1h' }
    )

    return token
}

exports.checkAuth = async function (login) {
    const token = jwt.sign(
        { login },
        process.env.jwtSecret,
        { expiresIn: '1h' }
    )

    return token
}