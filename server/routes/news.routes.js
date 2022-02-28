const {Router} = require('express')
const {check, param} = require("express-validator");
const NewsController = require('../controllers/news.controller')
const AuthMiddleware = require('../middlewares/auth.middleware')
const router = Router()

router.get('/',
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

router.get('/filter-by-tag/:tagId',
    [
        param('tagId', 'Отсутствует ID тега').exists()
    ],
    NewsController.filterByTag
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