const UserService = require('../services/auth.service')
const {validationResult} = require("express-validator");
const {errorHandler} = require("../utils/errorHandler");

exports.login = async function (req, res) {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Отсутствует логин и/или пароль'
            })
        }

        const { login, password } = req.body

        const token = await UserService.login(login, password)

        res.json({ token })
    } catch (e) {
        errorHandler(e, res)
    }
}