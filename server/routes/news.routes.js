const {Router} = require('express')
const {check, param} = require("express-validator");
const NewsController = require('../controllers/news.controller')
const AuthMiddleware = require('../middlewares/auth.middleware')
const router = Router()

router.get('/',
    NewsController.get
)

router.get('/:id',
    NewsController.getDetail
)

router.get('/filter-by-tag',
    [
        check('tagId', 'Отсутствует ID тега').exists()
    ],
    NewsController.filterByTag
)

router.post('/',
    AuthMiddleware,
    [
        check('title', 'Отсутствует название новости').exists(),
        check('previewImg', 'Отсутствует изображение превью').exists(),
        check('previewText', 'Отсутствует текст превью').exists(),
        check('content', 'Некорректный контент новости').isArray(),
        check('tags', 'Некорректный теги').isArray()
    ],
    NewsController.add
)

router.put('/:id',
    AuthMiddleware,
    [
        param('id').exists(),
        check('title', 'Отсутствует название новости').exists(),
        check('previewImg', 'Отсутствует изображение превью').exists(),
        check('previewText', 'Отсутствует текст превью').exists(),
        check('content', 'Некорректный контент новости').isJSON(),
        check('tags', 'Некорректный теги').isJSON()
    ],
    NewsController.update
)

router.delete('/:id',
    AuthMiddleware,
    [
        param('id').exists()
    ],
    NewsController.delete
)

module.exports = router