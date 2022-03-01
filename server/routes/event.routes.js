const { Router } = require('express')
const { check, param } = require("express-validator");
const EventController = require('../controllers/event.controller')
const AuthMiddleware = require('../middlewares/auth.middleware')
const router = Router()

router.get('/',
    EventController.get
)

router.post('/',
    AuthMiddleware,
    [
        check('name', 'Отсутствует название мероприятия').exists(),
        check('date', 'Некорректная дата мероприятия').isISO8601().toDate(),
        check('organizerText', 'Отсутствует название организатора').exists(),
        check('organizerLink', 'Некорректная ссылка на организатора').isURL()
    ],
    EventController.add
)

router.put('/:id',
    AuthMiddleware,
    [
        param('id', 'Отсутствует ID мероприятия').exists(),
        check('name', 'Отсутствует название мероприятия').exists(),
        check('organizerText', 'Отсутствует название организатора').exists(),
        check('organizerLink', 'Некорректная ссылка на организатора').isURL()
    ],
    EventController.update
)

router.delete('/:id',
    AuthMiddleware,
    [
        param('id', 'Отсутствует ID мероприятия').exists()
    ],
    EventController.delete
)

module.exports = router