const {Router} = require('express')
const {check, param} = require("express-validator");
const CouncilController = require('../controllers/council.controller')
const AuthMiddleware = require('../middlewares/auth.middleware')
const {isObjectId, checkJPG} = require("../utils/customValidators");
const router = Router()

router.get('/',
    CouncilController.get
)

router.post('/',
    AuthMiddleware,
    [
        check('lastName', 'Отсутствует фамилия члена совета').notEmpty(),
        check('firstAndMiddleName', 'Отсутствует имя и отчество члена совета').notEmpty(),
        check('department', 'Отсутствует кафедра члена совета').notEmpty(),
        check('position', 'Отсутствует должность члена совета').notEmpty(),
        check('phone', 'Отсутствует номер телефона члена совета').notEmpty(),
        check('photo')
            .exists().withMessage('Отсутствует фотография члена совета').bail()
            .custom(photo => checkJPG(photo))
            .withMessage('Фотография руководителя не в формате JPG'),
    ],
    CouncilController.add
)

router.put('/:id',
    AuthMiddleware,
    [
        param('id', 'Некорректный ID члена совета').custom(id => isObjectId(id)),
        check('lastName', 'Отсутствует фамилия члена совета').notEmpty(),
        check('firstAndMiddleName', 'Отсутствует имя и отчество члена совета').notEmpty(),
        check('department', 'Отсутствует кафедра члена совета').notEmpty(),
        check('position', 'Отсутствует должность члена совета').notEmpty(),
        check('phone', 'Отсутствует номер телефона члена совета').notEmpty(),
        check('photo')
            .optional()
            .exists().withMessage('Отсутствует фотография члена совета').bail()
            .custom(photo => checkJPG(photo))
            .withMessage('Фотография руководителя не в формате JPG'),
    ],
    CouncilController.update
)

router.delete('/:id',
    AuthMiddleware,
    [
        param('id', 'Некорректный ID члена совета').custom(id => isObjectId(id))
    ],
    CouncilController.delete
)

module.exports = router