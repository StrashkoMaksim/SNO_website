const {Router} = require('express')
const {check, param} = require("express-validator");
const CouncilController = require('../controllers/council.controller')
const AuthMiddleware = require('../middlewares/auth.middleware')
const router = Router()

router.get('/',
    CouncilController.get
)

router.post('/',
    AuthMiddleware,
    [
        check('fio', 'Отсутствует ФИО члена совета').exists(),
        check('department', 'Отсутствует кафедра члена совета').exists(),
        check('position', 'Отсутствует должность члена совета').exists(),
        check('phone', 'Отсутствует номер телефона члена совета').exists()
    ],
    CouncilController.add
)

router.put('/:id',
    AuthMiddleware,
    [
        param('id', 'Отсутствует ID члена совета').exists(),
        check('fio', 'Отсутствует ФИО члена совета').exists(),
        check('department', 'Отсутствует кафедра члена совета').exists(),
        check('position', 'Отсутствует должность члена совета').exists(),
        check('phone', 'Отсутствует номер телефона члена совета').exists()
    ],
    CouncilController.update
)

router.delete('/:id',
    AuthMiddleware,
    [
        param('id', 'Отсутствует ID члена совета').exists()
    ],
    CouncilController.delete
)

module.exports = router