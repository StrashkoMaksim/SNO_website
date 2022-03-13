const UserService = require('../services/auth.service')
const {errorHandler, errorValidator} = require("../utils/errorHandler")

exports.login = async function (req, res) {
    try {
        errorValidator(req, res)

        const { login, password } = req.body

        const token = await UserService.login(login, password)

        res.json({ token })
    } catch (e) {
        errorHandler(e, res)
    }
}

exports.checkAuth = async function (req, res) {
    try {
        const user = req.user
        const token = await UserService.checkAuth(user.login)

        res.json({ token })
    } catch (e) {
        errorHandler(e, res)
    }
}