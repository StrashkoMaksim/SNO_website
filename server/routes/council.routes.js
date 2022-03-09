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
        check('lastName', 'Отсутствует фамилия члена совета').exists(),
        check('firstAndMiddleName', 'Отсутствует имя и отчество члена совета').exists(),
        check('department', 'Отсутствует кафедра члена совета').exists(),
        check('position', 'Отсутствует должность члена совета').exists(),
        check('phone', 'Отсутствует номер телефона члена совета').exists(),
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
        check('lastName', 'Отсутствует фамилия члена совета').exists(),
        check('firstAndMiddleName', 'Отсутствует имя и отчество члена совета').exists(),
        check('department', 'Отсутствует кафедра члена совета').exists(),
        check('position', 'Отсутствует должность члена совета').exists(),
        check('phone', 'Отсутствует номер телефона члена совета').exists(),
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
        param('id', 'Отсутствует ID члена совета').exists()
    ],
    CouncilController.delete
)

module.exports = router