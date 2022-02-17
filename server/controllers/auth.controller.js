const UserService = require('../services/auth.service')
const {validationResult} = require("express-validator");

exports.login = async function (req, res) {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректный логин и/или пароль'
            })
        }

        const { login, password } = req.body

        const token = await UserService.login(login, password)

        res.json({ token })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
}