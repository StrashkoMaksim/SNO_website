const {Router} = require('express')
const {check, param, body} = require("express-validator");
const SectionController = require('../controllers/section.controller')
const AuthMiddleware = require('../middlewares/auth.middleware')
const {parseJSON, checkSupervisor, isObjectId, checkSchedule, checkJPG, checkPNG, checkAchievements, checkArrayJPG} = require("../utils/customValidators");
const router = Router()

router.get('/',
    SectionController.get
)

router.get('/:id',
    [
        param('id', 'Некорректный ID кружка').custom(id => isObjectId(id))
    ],
    SectionController.getDetail
)

router.post('/',
    AuthMiddleware,
    [
        check('name', 'Отсутствует название кружка').notEmpty(),
        check('previewText', 'Отсутствует текст превью').notEmpty(),
        check('logo')
            .exists().withMessage('Отсутствует логотип').bail()
            .custom(logo => checkPNG(logo))
            .withMessage('Логотип не в формате PNG'),
        check('content', 'Некорректный контент кружка').isJSON(),
        check('contentImages')
            .optional()
            .if(body('contentImages').not().isArray()).toArray(),
        check('contentImages')
            .optional()
            .custom(contentImages => checkArrayJPG(contentImages))
            .withMessage('Некорректный формат контентных картинок'),
        check('supervisor')
            .isJSON().withMessage('Руководитель не в формате JSON').bail()
            .customSanitizer(json => parseJSON(json))
            .custom(supervisor => checkSupervisor(supervisor))
            .withMessage('Отсутствуют поля у руководителя'),
        check('supervisorPhoto')
            .exists().withMessage('Отсутствует фотография руководителя').bail()
            .custom(photo => checkPNG(photo))
            .withMessage('Фотография руководителя не в формате JPG'),
        check('schedule')
            .exists().withMessage('Отсутствует расписание')
            .if(check('schedule').not().isArray()).toArray(),
        check('schedule')
            .custom(schedule => checkSchedule(schedule)).withMessage('Некорректный формат занятия'),
        check('achievements')
            .optional()
            .if(body('achievements').not().isArray()).toArray(),
        check('achievements')
            .optional()
            .custom(achievements => checkArrayJPG(achievements))
            .withMessage('Достижения не в формате JPG')
    ],
    SectionController.add
)

router.put('/:id',
    AuthMiddleware,
    [
        param('id', 'Некорректный ID кружка').custom(id => isObjectId(id)),
        check('previewText', 'Отсутствует текст превью').isLength({min: 1}),
        check('content', 'Некорректный контент кружка').isJSON(),
        check('supervisor', 'Некорректный формат руководителя кружка').isJSON()
            .customSanitizer(json => parseJSON(json)).custom(supervisor => checkSupervisor(supervisor)),
        check('schedule', 'Некорректный формат расписания кружка')
            .if(body('schedule').not().isArray()).toArray()
            .custom(schedule => checkSchedule(schedule)),
        check('achievements', 'Некорректный формат достижений кружка').exists().toArray(),
    ],
    SectionController.update
)

router.delete('/:id',
    AuthMiddleware,
    [
        param('id', 'Некорректный ID кружка').custom(id => isObjectId(id))
    ],
    SectionController.delete
)

module.exports = router