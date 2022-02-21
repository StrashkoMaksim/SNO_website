const {Router} = require('express')
const {check, param} = require("express-validator");
const DocumentCategoryController = require('../controllers/documentCategory.controller')
const AuthMiddleware = require('../middlewares/auth.middleware')
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
        check('title', 'Отсутствует название категории').exists()
    ],
    DocumentCategoryController.addCategory
)

router.put('/:categoryId',
    AuthMiddleware,
    [
        param('categoryId', 'Отсутствует ID категории').exists(),
        check('title', 'Отсутствует название категории').exists(),
    ],
    DocumentCategoryController.updateCategory
)

router.delete('/:categoryId',
    AuthMiddleware,
    [
        param('categoryId', 'Отсутствует ID категории').exists()
    ],
    DocumentCategoryController.deleteCategory
)

router.get('/:categoryId',
    AuthMiddleware,
    [
        param('categoryId', 'Отсутствует ID категории').exists()
    ],
    DocumentCategoryController.getDocumentsFromCategory
)

router.post('/:categoryId',
    AuthMiddleware,
    [
        param('categoryId', 'Отсутствует ID категории').exists(),
        check('name', 'Отсутствует название документа').exists()
    ],
    DocumentCategoryController.addDocumentInCategory
)

router.delete('/:categoryId/:documentNumber',
    AuthMiddleware,
    [
        param('categoryId', 'Отсутствует ID категории').exists(),
        param('documentNumber', 'Некорректный номер документа').isNumeric()
    ],
    DocumentCategoryController.deleteDocumentInCategory
)

module.exports = router