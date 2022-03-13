const {Router} = require('express')
const {check, param} = require("express-validator")
const TagController = require('../controllers/tag.controller')
const AuthMiddleware = require('../middlewares/auth.middleware')
const {isObjectId} = require("../utils/customValidators")
const router = Router()

router.get('/',
    TagController.get
)

router.post('/',
    AuthMiddleware,
    [
        check('name', 'Отсутствует название тега').trim().notEmpty(),
    ],
    TagController.add
)

router.put('/:id',
    AuthMiddleware,
    [
        param('id', 'Некорректный ID тега').custom(id => isObjectId(id)),
        check('name', 'Отсутствует название тега').trim().notEmpty()
    ],
    TagController.update
)

router.delete('/:id',
    AuthMiddleware,
    [
        param('id', 'Некорректный ID тега').custom(id => isObjectId(id))
    ],
    TagController.delete
)

module.exports = router