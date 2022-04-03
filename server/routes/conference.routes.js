const { Router } = require('express')
const { check, param } = require("express-validator");
const ConferenceController = require('../controllers/conference.controller')
const AuthMiddleware = require('../middlewares/auth.middleware')
const { isObjectId, checkJPG } = require("../utils/customValidators");
const router = Router()

router.get('/',
    ConferenceController.get
)

router.get('/all',
    ConferenceController.getAll
)

router.post('/',
    AuthMiddleware,
    [
        check('description', 'Отсутствует описание конференции').notEmpty(),
        check('image')
            .exists().withMessage('Отсутствует фотография').bail()
            .custom(photo => checkJPG(photo))
            .withMessage('Фотография не в формате JPG'),
    ],
    ConferenceController.add
)

router.put('/:conferenceId',
    AuthMiddleware,
    [
        param('conferenceId', 'Некорректный ID конференции').custom(id => isObjectId(id)),
        check('description', 'Отсутствует описание конференции').notEmpty(),
        check('image')
            .exists().withMessage('Отсутствует фотография').bail()
            .custom(photo => checkJPG(photo))
            .withMessage('Фотография не в формате JPG'),
    ],
    ConferenceController.update
)

router.delete('/:conferenceId',
    AuthMiddleware,
    [
        param('conferenceId', 'Некорректный ID конференции')
        .custom(id => isObjectId(id))
    ],
    ConferenceController.delete
)

router.post('/:conferenceId',
    AuthMiddleware,
    [
        param('conferenceId')
            .custom(id => isObjectId(id))
            .withMessage('ID не является ObjectID'),
        check('name', 'Отсутствует название документа').trim().notEmpty()
    ],
    ConferenceController.addDocumentInConference
)

router.delete('/:conferenceId/:documentNumber',
    AuthMiddleware,
    [
        param('conferenceId')
            .custom(id => isObjectId(id))
            .withMessage('ID не является ObjectID'),
        param('documentNumber', 'Некорректный номер документа').trim().isNumeric()
    ],
    ConferenceController.deleteDocumentInConference
)


module.exports = router