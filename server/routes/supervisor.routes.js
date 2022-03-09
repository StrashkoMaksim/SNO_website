const {Router} = require('express')
const {check, param} = require("express-validator");
const SupervisorController = require('../controllers/supervisor.controller')
const AuthMiddleware = require('../middlewares/auth.middleware')
const {checkJPG} = require("../utils/customValidators");
const router = Router()

router.get('/',
    SupervisorController.get
)

router.post('/',
    AuthMiddleware,
    [
        check('lastName', 'Отсутствует фамилия руководителя').notEmpty(),
        check('firstAndMiddleName', 'Отсутствует имя и отчество руководителя').notEmpty(),
        check('department', 'Отсутствует кафедра руководителя').notEmpty(),
        check('position', 'Отсутствует должность руководителя').notEmpty(),
        check('phone', 'Отсутствует номер телефона руководителя').notEmpty(),
        check('photo')
            .exists().withMessage('Отсутствует фотография руководителя').bail()
            .custom(photo => checkJPG(photo))
            .withMessage('Фотография руководителя не в формате JPG'),
    ],
    SupervisorController.add
)

router.put('/:id',
    AuthMiddleware,
    [
        param('id', 'Отсутствует ID руководителя').notEmpty(),
        check('lastName', 'Отсутствует фамилия руководителя').notEmpty(),
        check('firstAndMiddleName', 'Отсутствует имя и отчество руководителя').notEmpty(),
        check('department', 'Отсутствует кафедра руководителя').notEmpty(),
        check('position', 'Отсутствует должность руководителя').notEmpty(),
        check('phone', 'Отсутствует номер телефона руководителя').notEmpty(),
        check('photo')
            .exists().withMessage('Отсутствует фотография руководителя').bail()
            .custom(photo => checkJPG(photo))
            .withMessage('Фотография руководителя не в формате JPG'),
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