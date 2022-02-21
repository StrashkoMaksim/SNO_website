const {Router} = require('express')
const {check, param} = require("express-validator");
const GrantsDocumentController = require('../controllers/grantsDocument.controller')
const AuthMiddleware = require('../middlewares/auth.middleware')
const router = Router()

router.get('/',
    GrantsDocumentController.get
)

router.post('/',
    AuthMiddleware,
    [
        check('name', 'Отсутствует название документа').exists(),
    ],
    GrantsDocumentController.add
)

router.delete('/:id',
    AuthMiddleware,
    [
        param('id', 'Отсутствует ID документа').exists()
    ],
    GrantsDocumentController.delete
)

module.exports = router