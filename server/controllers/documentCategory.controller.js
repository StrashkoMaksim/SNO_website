const DocumentCategoryService = require('../services/documentCategory.service')
const {errorHandler, errorValidator} = require("../utils/errorHandler")

exports.getCategories = async function (req, res) {
    try {
        const categories = await DocumentCategoryService.getCategories()
        res.json(categories)
    } catch (e) {
        errorHandler(e, res)
    }
}

exports.getCategoriesWithDocuments = async function (req, res) {
    try {
        const categories = await DocumentCategoryService.getCategoriesWithDocuments()
        console.log(categories)
        res.json(categories)
    } catch (e) {
        errorHandler(e, res)
    }
}


exports.addCategory = async function (req, res) {
    try {
        errorValidator(req, res)
        const { title } = req.body
        const categories = await DocumentCategoryService.addCategory(title)

        res.status(201).json({ message: 'Категория успешно добавлена', categories })
    } catch (e) {
        errorHandler(e, res)
    }
}

exports.updateCategory = async function (req, res) {
    try {
        errorValidator(req, res)

        const { categoryId } = req.params
        const { title } = req.body

        const categories = await DocumentCategoryService.updateCategory(categoryId, title)

        res.status(201).json({ message: 'Категория успешно отредактирована', categories })
    } catch (e) {
        errorHandler(e, res)
    }
}

exports.deleteCategory = async function (req, res) {
    try {
        errorValidator(req, res)

        const { categoryId } = req.params

        const categories = await DocumentCategoryService.deleteCategory(categoryId)

        return res.json({ message: 'Категория успешно удалена', categories })
    } catch (e) {
        errorHandler(e, res)
    }
}

exports.getDocumentsFromCategory = async function (req, res) {
    try {
        errorValidator(req, res)

        const { categoryId } = req.params

        const documents = await DocumentCategoryService.getDocumentsFromCategory(categoryId)
        res.json(documents)
    } catch (e) {
        errorHandler(e, res)
    }
}

exports.addDocumentInCategory = async function (req, res) {
    try {
        errorValidator(req, res)

        const { categoryId } = req.params
        const { name, link, type } = req.body
        const { file } = req.files
        const documents = await DocumentCategoryService.addDocumentInCategory(categoryId, name, link, file, type)
        res.json(documents)
    } catch (e) {
        errorHandler(e, res)
    }
}

exports.deleteDocumentInCategory = async function (req, res) {
    try {
        errorValidator(req, res)

        const { categoryId, documentNumber } = req.params

        const documents = await DocumentCategoryService.deleteDocumentInCategory(categoryId, documentNumber)
        res.json(documents)
    } catch (e) {
        errorHandler(e, res)
    }
}