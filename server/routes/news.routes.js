const {Router} = require('express')
const {check, param, query} = require("express-validator")
const NewsController = require('../controllers/news.controller')
const AuthMiddleware = require('../middlewares/auth.middleware')
const {isObjectId} = require("../utils/customValidators")
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
        check('title', 'Отсутствует название новости').trim().notEmpty(),
        check('previewText', 'Отсутствует текст превью').trim().notEmpty(),
        check('content', 'Некорректный контент новости').isJSON(),
        check('tags', 'Некорректный теги').isJSON()
    ],
    NewsController.add
)

router.put('/:id',
    AuthMiddleware,
    [
        param('id')
            .custom(id => isObjectId(id))
            .withMessage('ID не является ObjectID'),
        check('title', 'Отсутствует название новости').trim().notEmpty(),
        check('previewText', 'Отсутствует текст превью').trim().notEmpty(),
        check('content', 'Некорректный контент новости').isJSON(),
        check('tags', 'Некорректный теги').isJSON()
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