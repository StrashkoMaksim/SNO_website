const {Router} = require('express')
const {check, param} = require("express-validator");
const TagController = require('../controllers/tag.controller')
const AuthMiddleware = require('../middlewares/auth.middleware')
const router = Router()

router.get('/',
    TagController.get
)

router.post('/',
    AuthMiddleware,
    [
        check('name', 'Отсутствует название тега').exists(),
    ],
    TagController.add
)

router.put('/:id',
    AuthMiddleware,
    [
        param('id', 'Отсутствует ID тега').exists(),
        check('name', 'Отсутствует название тега').exists(),
    ],
    TagController.update
)

router.delete('/:id',
    AuthMiddleware,
    [
        param('id', 'Отсутствует ID тега').exists()
    ],
    TagController.delete
)

module.exports = router