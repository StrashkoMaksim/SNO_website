const {Router} = require('express')
const {check, param} = require("express-validator");
const SectionController = require('../controllers/section.controller')
const AuthMiddleware = require('../middlewares/auth.middleware')
const router = Router()

router.get('/',
    SectionController.get
)

router.get('/:id',
    [
        param('id', 'Отсутствует ID кружка').exists()
    ],
    SectionController.getDetail
)

router.post('/',
    AuthMiddleware,
    [
        check('title', 'Отсутствует название кружка').exists(),
        check('previewText', 'Отсутствует текст превью').exists(),
        check('content', 'Некорректный контент кружка').isJSON(),
    ],
    SectionController.add
)

router.put('/:id',
    AuthMiddleware,
    [
        param('id', 'Отсутствует ID кружка').exists(),
        check('title', 'Отсутствует название кружка').exists(),
        check('previewText', 'Отсутствует текст превью').exists(),
        check('content', 'Некорректный контент кружка').isJSON(),
    ],
    SectionController.update
)

router.delete('/:id',
    AuthMiddleware,
    [
        param('id', 'Отсутствует ID кружка').exists()
    ],
    SectionController.delete
)

module.exports = router