const jwt = require("jsonwebtoken");

exports.login = async function (login, password) {
    try {
        const isLoginMatch = login === process.env.adminLogin
        const isPasswordMatch = password === process.env.adminPassword

        if (!isLoginMatch || !isPasswordMatch) {
            return res.status(400).json({ message: 'Некорректный логин и/или пароль' })
        }

        const token = jwt.sign(
            { login },
            process.env.jwtSecret,
            { expiresIn: '1h' }
        )

        return token
    } catch (e) {
        throw Error('Что-то пошло не так, попробуйте снова')
    }
}