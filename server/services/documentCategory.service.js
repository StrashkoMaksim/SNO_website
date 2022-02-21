const DocumentCategory = require('../models/DocumentCategory')
const createError = require("http-errors");
const {Types} = require("mongoose");
const fs = require("fs");
const {saveFile} = require("../utils/fileHelper");
const validUrl = require("valid-url");

exports.getCategories = async function () {
    const categories = await DocumentCategory.find().select('title')

    return categories
}

exports.getCategoriesWithDocuments = async function () {
    const categories = await DocumentCategory.find()

    return categories
}

exports.addCategory = async function (title) {
    const category = new DocumentCategory({ title })

    await category.save()

    const categories = await exports.getCategories()

    return categories
}

exports.updateCategory = async function (id, title) {
    if (!Types.ObjectId.isValid(id)) {
        throw createError(400, 'Некорректный ID категории')
    }

    const category = await DocumentCategory.findById(id)

    if(!category) {
        throw createError(404, 'Категория не найдена')
    }

    const savedCategory = await DocumentCategory.replaceOne({ _id: id }, { title })

    if (savedCategory.modifiedCount !== 1) {
        throw Error()
    }

    const categories = await exports.getCategories()

    return categories
}

exports.deleteCategory = async function (id) {
    if (!Types.ObjectId.isValid(id)) {
        throw createError(400, 'Некорректный ID категории')
    }

    const category = await DocumentCategory.findById(id)

    category.get('documents').forEach(document => {
        if (document.type !== 'link') {
            fs.unlink(`${process.env.staticPath}\\${document.link}`, (err) => {
                if(err) console.log(err);
            })
        }
    })

    await DocumentCategory.findByIdAndDelete(id)

    const categories = await exports.getCategories()

    return categories
}

exports.getDocumentsFromCategory = async function (categoryId) {
    if (!Types.ObjectId.isValid(categoryId)) {
        throw createError(400, 'Некорректный ID категории')
    }

    const categories = await DocumentCategory.find().select('documents').populate('documents')

    return categories
}

exports.addDocumentInCategory = async function (categoryId, name, link, file, type = 'link') {
    if (!Types.ObjectId.isValid(categoryId)) {
        throw createError(400, 'Некорректный ID категории')
    }

    const category = await DocumentCategory.findById(categoryId).populate('documents')

    if (!category) {
        throw createError(404, 'Категория не найдена')
    }

    if (!file && !link) {
        throw createError(400, 'Отсутствует ссылка или файл')
    } else if (file) {
        const { resultType, resultLink } = saveFile(file)
        type = resultType
        link = resultLink
    } else {
        if (!validUrl.isUri(link)) {
            throw createError(400, 'Некорректная ссылка')
        }
    }

    category.get('document').push({type, name, link})
    await category.save()

    const categories = await exports.getDocumentsFromCategory(categoryId)

    return categories
}

exports.deleteDocumentInCategory = async function (categoryId, documentNumber) {
    if (!Types.ObjectId.isValid(categoryId)) {
        throw createError(400, 'Некорректный ID категории')
    }

    const category = await DocumentCategory.findById(categoryId)

    if (!category) {
        throw createError(404, 'Категория не найдена')
    }

    const document = category.get('documents')[documentNumber]

    if (!document) {
        throw createError(404, 'Документ не найден')
    }

    if (document.type !== 'link') {
        fs.unlink(`${process.env.staticPath}\\${document.link}`, (err) => {
            if(err) console.log(err);
        })
    }

    category.get('documents').splice(documentNumber, 1)

    await category.save()

    const documents = await exports.getDocumentsFromCategory(categoryId)

    return documents
}