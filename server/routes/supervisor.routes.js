const {Router} = require('express')
const {check, param} = require("express-validator");
const SupervisorController = require('../controllers/supervisor.controller')
const AuthMiddleware = require('../middlewares/auth.middleware')
const {checkJPG, isObjectId} = require("../utils/customValidators");
const router = Router()

router.get('/',
    SupervisorController.get
)

router.post('/',
    AuthMiddleware,
    [
        check('lastName', 'Отсутствует фамилия руководителя').trim().notEmpty(),
        check('firstAndMiddleName', 'Отсутствует имя и отчество руководителя').trim().notEmpty(),
        check('department', 'Отсутствует кафедра руководителя').trim().notEmpty(),
        check('position', 'Отсутствует должность руководителя').trim().notEmpty(),
        check('phone', 'Отсутствует номер телефона руководителя').trim().notEmpty(),
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
        param('id', 'Некорректный ID руководителя').custom(id => isObjectId(id)),
        check('lastName', 'Отсутствует фамилия руководителя').trim().notEmpty(),
        check('firstAndMiddleName', 'Отсутствует имя и отчество руководителя').trim().notEmpty(),
        check('department', 'Отсутствует кафедра руководителя').trim().notEmpty(),
        check('position', 'Отсутствует должность руководителя').trim().notEmpty(),
        check('phone', 'Отсутствует номер телефона руководителя').trim().notEmpty(),
        check('photo')
            .optional()
            .exists().withMessage('Отсутствует фотография руководителя').bail()
            .custom(photo => checkJPG(photo))
            .withMessage('Фотография руководителя не в формате JPG'),
    ],
    SupervisorController.update
)

router.delete('/:id',
    AuthMiddleware,
    [
        param('id', 'Некорректный ID руководителя').custom(id => isObjectId(id))
    ],
    SupervisorController.delete
)

module.exports = router