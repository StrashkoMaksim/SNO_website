const {Router} = require('express')
const {check, param, query, body} = require("express-validator")
const NewsController = require('../controllers/news.controller')
const AuthMiddleware = require('../middlewares/auth.middleware')
const {isObjectId, parseJSON, checkArrayJPG, checkArrayObjectId, checkPNG, checkJPG} = require("../utils/customValidators")
const router = Router()

router.get('/',
    [
        query('count')
            .optional()
            .trim().isInt({ min: 1 })
            .withMessage('Количество должно быть целым положительным числом'),
        query('page')
            .optional()
            .trim().isInt({ min: 1 })
            .withMessage('Страница должна быть целым положительным числом'),
        query('tag')
            .optional()
            .custom(tag => isObjectId(tag))
            .withMessage('Id тега не является ObjectID'),
        query('search')
            .optional()
            .trim().notEmpty()
            .withMessage('Строка поиска не должна быть пустой')
    ],
    NewsController.get
)

router.get('/:id',
    [
        param('id')
            .custom(id => isObjectId(id))
            .withMessage('ID не является ObjectID')
    ],
    NewsController.getDetail
)

router.get('/admin/:id',
    AuthMiddleware,
    [
        param('id')
            .custom(id => isObjectId(id))
            .withMessage('ID не является ObjectID')
    ],
    NewsController.getAdmin
)

router.post('/',
    AuthMiddleware,
    [
        check('title')
            .trim().notEmpty()
            .withMessage('Отсутствует название'),
        check('previewImg')
            .exists().withMessage('Отсутствует картинка превью').bail()
            .custom(img => checkJPG(img))
            .withMessage('Картинка превью не в формате JPG'),
        check('previewText')
            .trim().notEmpty()
            .withMessage('Отсутствует описание'),
        check('content')
            .isJSON()
            .withMessage('Контент не в формате JSON')
            .customSanitizer(content => parseJSON(content))
            .isArray()
            .withMessage('Контент должен быть массивом блоков')
            .isLength({min: 1})
            .withMessage('Отсутствует контент'),
        check('contentImages')
            .optional()
            .if(body('contentImages').not().isArray()).toArray(),
        check('contentImages')
            .optional()
            .custom(contentImages => checkArrayJPG(contentImages))
            .withMessage('Некорректный формат контентных картинок'),
        check('tags')
            .optional()
            .if(check('tags').not().isArray()).toArray(),
        check('tags')
            .optional()
            .custom(tags => checkArrayObjectId(tags))
            .withMessage('Один из тегов не в формате ObjectID')
    ],
    NewsController.add
)

router.put('/:id',
    AuthMiddleware,
    [
        param('id')
            .custom(id => isObjectId(id))
            .withMessage('ID не является ObjectID'),
        check('title')
            .optional()
            .trim().notEmpty()
            .withMessage('Отсутствует название'),
        check('previewImg')
            .optional()
            .exists().withMessage('Отсутствует картинка превью').bail()
            .custom(img => checkJPG(img))
            .withMessage('Картинка превью не в формате JPG'),
        check('previewText')
            .optional()
            .trim().notEmpty()
            .withMessage('Отсутствует описание'),
        check('content')
            .optional()
            .isJSON()
            .withMessage('Контент не в формате JSON')
            .customSanitizer(content => parseJSON(content))
            .isArray()
            .withMessage('Контент должен быть массивом блоков')
            .isLength({min: 1})
            .withMessage('Отсутствует контент'),
        check('contentImages')
            .optional()
            .if(body('contentImages').not().isArray()).toArray(),
        check('contentImages')
            .optional()
            .custom(contentImages => checkArrayJPG(contentImages))
            .withMessage('Некорректный формат контентных картинок'),
        check('tags')
            .optional()
            .if(check('tags').not().isArray()).toArray(),
        check('tags')
            .optional()
            .custom(tags => checkArrayObjectId(tags))
            .withMessage('Один из тегов не в формате ObjectID')
    ],
    NewsController.update
)

router.delete('/:id',
    AuthMiddleware,
    [
        param('id')
            .custom(id => isObjectId(id))
            .withMessage('ID не является ObjectID')
    ],
    NewsController.delete
)

module.exports = router