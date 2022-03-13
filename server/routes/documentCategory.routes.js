const {Router} = require('express')
const {check, param} = require("express-validator");
const DocumentCategoryController = require('../controllers/documentCategory.controller')
const AuthMiddleware = require('../middlewares/auth.middleware')
const {isObjectId} = require("../utils/customValidators");
const router = Router()

router.get('/',
    DocumentCategoryController.getCategories
)

router.get('/with-documents',
    DocumentCategoryController.getCategoriesWithDocuments
)

router.post('/',
    AuthMiddleware,
    [
        check('title', 'Отсутствует название категории').trim().notEmpty()
    ],
    DocumentCategoryController.addCategory
)

router.put('/:categoryId',
    AuthMiddleware,
    [
        param('categoryId')
            .custom(id => isObjectId(id))
            .withMessage('ID не является ObjectID'),
        check('title', 'Отсутствует название категории').trim().notEmpty()
    ],
    DocumentCategoryController.updateCategory
)

router.delete('/:categoryId',
    AuthMiddleware,
    [
        param('categoryId')
            .custom(id => isObjectId(id))
            .withMessage('ID не является ObjectID')
    ],
    DocumentCategoryController.deleteCategory
)

router.get('/:categoryId',
    AuthMiddleware,
    [
        param('categoryId')
            .custom(id => isObjectId(id))
            .withMessage('ID не является ObjectID')
    ],
    DocumentCategoryController.getDocumentsFromCategory
)

router.post('/:categoryId',
    AuthMiddleware,
    [
        param('categoryId')
            .custom(id => isObjectId(id))
            .withMessage('ID не является ObjectID'),
        check('name', 'Отсутствует название документа').trim().notEmpty()
    ],
    DocumentCategoryController.addDocumentInCategory
)

router.delete('/:categoryId/:documentNumber',
    AuthMiddleware,
    [
        param('categoryId')
            .custom(id => isObjectId(id))
            .withMessage('ID не является ObjectID'),
        param('documentNumber', 'Некорректный номер документа').trim().isNumeric()
    ],
    DocumentCategoryController.deleteDocumentInCategory
)

module.exports = router