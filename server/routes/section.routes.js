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
        check('supervisor')
            .isJSON().withMessage('Руководитель не в формате JSON').bail()
            .customSanitizer(json => parseJSON(json))
            .custom(supervisor => checkSupervisor(supervisor))
            .withMessage('Отсутствуют поля у руководителя'),
        check('supervisorPhoto')
            .exists().withMessage('Отсутствует фотография руководителя').bail()
            .custom(photo => checkJPG(photo))
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
        check('name', 'Отсутствует название кружка').optional().notEmpty(),
        check('previewText', 'Отсутствует текст превью').optional().notEmpty(),
        check('logo')
            .optional()
            .custom(logo => checkPNG(logo))
            .withMessage('Логотип не в формате PNG'),
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
        check('supervisor')
            .optional()
            .isJSON().withMessage('Руководитель не в формате JSON').bail()
            .customSanitizer(json => parseJSON(json))
            .custom(supervisor => checkSupervisor(supervisor))
            .withMessage('Отсутствуют поля у руководителя'),
        check('supervisorPhoto')
            .optional()
            .exists().withMessage('Отсутствует фотография руководителя').bail()
            .custom(photo => checkJPG(photo))
            .withMessage('Фотография руководителя не в формате JPG'),
        check('schedule')
            .optional()
            .exists().withMessage('Отсутствует расписание')
            .if(check('schedule').not().isArray()).toArray(),
        check('schedule')
            .optional()
            .custom(schedule => checkSchedule(schedule)).withMessage('Некорректный формат занятия'),
        check('achievements')
            .optional()
            .if(body('achievements').not().isArray()).toArray(),
        check('achievements')
            .optional()
            .custom(achievements => checkArrayJPG(achievements))
            .withMessage('Достижения не в формате JPG')
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