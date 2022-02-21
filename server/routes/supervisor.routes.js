const {Router} = require('express')
const {check, param} = require("express-validator");
const SupervisorController = require('../controllers/supervisor.controller')
const AuthMiddleware = require('../middlewares/auth.middleware')
const router = Router()

router.get('/',
    SupervisorController.get
)

router.post('/',
    AuthMiddleware,
    [
        check('fio', 'Отсутствует ФИО руководителя').exists(),
        check('department', 'Отсутствует кафедра руководителя').exists(),
        check('position', 'Отсутствует должность руководителя').exists(),
        check('phone', 'Отсутствует номер телефона руководителя').exists()
    ],
    SupervisorController.add
)

router.put('/:id',
    AuthMiddleware,
    [
        param('id', 'Отсутствует ID руководителя').exists(),
        check('fio', 'Отсутствует ФИО руководителя').exists(),
        check('department', 'Отсутствует кафедра руководителя').exists(),
        check('position', 'Отсутствует должность руководителя').exists(),
        check('phone', 'Отсутствует номер телефона руководителя').exists()
    ],
    SupervisorController.update
)

router.delete('/:id',
    AuthMiddleware,
    [
        param('id', 'Отсутствует ID руководителя').exists()
    ],
    SupervisorController.delete
)

module.exports = router