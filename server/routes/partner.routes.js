const {Router} = require('express')
const {check, param} = require("express-validator")
const PartnerController = require('../controllers/partner.controller')
const AuthMiddleware = require('../middlewares/auth.middleware')
const {isObjectId, checkPNG} = require("../utils/customValidators")
const router = Router()

router.get('/',
    PartnerController.get
)

router.post('/',
    AuthMiddleware,
    [
        check('link')
            .trim().isURL()
            .withMessage('Некорректная ссылка на партнера'),
        check('img')
            .exists()
            .withMessage('Отсутствует логотип партнера')
            .custom(img => checkPNG(img))
            .withMessage('Логотип партнера не в формате PNG'),
    ],
    PartnerController.add
)

router.delete('/:id',
    AuthMiddleware,
    [
        param('id', 'Некорректный ID партнера').custom(id => isObjectId(id))
    ],
    PartnerController.delete
)

module.exports = router