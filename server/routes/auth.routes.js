const {Router} = require('express')
const {check} = require("express-validator");
const router = Router()
const AuthController = require('../controllers/auth.controller')

router.post('/login',
    [
        check('login', 'Введите логин').exists(),
        check('password', 'Введите пароль').exists()
    ],
    AuthController.login
)

module.exports = router