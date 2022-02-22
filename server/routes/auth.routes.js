const {Router} = require('express')
const {check} = require("express-validator");
const router = Router()
const AuthController = require('../controllers/auth.controller')
const AuthMiddleware = require("../middlewares/auth.middleware");

router.post('/login',
    [
        check('login', 'Введите логин').exists(),
        check('password', 'Введите пароль').exists()
    ],
    AuthController.login
)

router.get('/check-auth',
    AuthMiddleware,
    AuthController.checkAuth
)

module.exports = router