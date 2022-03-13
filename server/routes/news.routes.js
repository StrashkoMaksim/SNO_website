const {Router} = require('express')
const {check, param, query} = require("express-validator");
const NewsController = require('../controllers/news.controller')
const AuthMiddleware = require('../middlewares/auth.middleware')
const {isObjectId} = require("../utils/customValidators");
const router = Router()

router.get('/',
    [
        query('count')
            .optional()
            .isInt({ min: 1 })
            .withMessage('Количество должно быть целым положительным числом'),
        query('page')
            .optional()
            .isInt({ min: 1 })
            .withMessage('Страница должна быть целым положительным числом'),
        query('tag')
            .optional()
            .custom(tag => isObjectId(tag))
            .withMessage('Id тега не является ObjectID'),
        query('search')
            .optional()
            .notEmpty()
            .withMessage('Строка поиска не должна быть пустой')
    ],
    NewsController.get
)

router.get('/:id',
    [
        param('id', 'Отсутствует ID новости').exists()
    ],
    NewsController.getDetail
)

router.get('/admin/:id',
    AuthMiddleware,
    [
        param('id', 'Отсутствует ID новости').exists()
    ],
    NewsController.getAdmin
)

router.post('/',
    AuthMiddleware,
    [
        check('title', 'Отсутствует название новости').exists(),
        check('previewText', 'Отсутствует текст превью').exists(),
        check('content', 'Некорректный контент новости').isJSON(),
        check('tags', 'Некорректный теги').isJSON()
    ],
    NewsController.add
)

router.put('/:id',
    AuthMiddleware,
    [
        param('id', 'Отсутствует ID новости').exists(),
        check('title', 'Отсутствует название новости').exists(),
        check('previewText', 'Отсутствует текст превью').exists(),
        check('content', 'Некорректный контент новости').isJSON(),
        check('tags', 'Некорректный теги').isJSON()
    ],
    NewsController.update
)

router.delete('/:id',
    AuthMiddleware,
    [
        param('id', 'Отсутствует ID новости').exists()
    ],
    NewsController.delete
)

module.exports = router