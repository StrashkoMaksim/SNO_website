const DocumentCategory = require('../models/DocumentCategory')
const createError = require("http-errors");
const {Types} = require("mongoose");
const uuid = require('uuid')
const fs = require("fs");

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

    category.documents.forEach(document => {
        fs.unlink(`${process.env.staticPath}\\${document.link}`, (err) => {
            if(err) console.log(err);
        })
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

    if (!file && !link) {
        throw createError(400, 'Отсутствует ссылка или файл')
    } else if (file) {
        const fileNameArr = file.name.split('.')
        type = fileNameArr[fileNameArr.length - 1].toLowerCase()

        if (type !== 'pdf' && type !== 'docx' && type !== 'doc') {
            throw createError(400, 'Недопустимый тип файла. Попробуйте PDF, DOCX, DOC.')
        }

        link = `${uuid.v4()}.${type}`

        await fs.readFile(`${process.env.tempPath}\\${file.path.split('\\')[2]}`,
            async (err, data) => {
                if(err) throw err

                await fs.writeFile(`${process.env.staticPath}\\${link}`, data, (err) => {
                    if(err) throw err
                })
            }
        )
    }

    const category = await DocumentCategory.findById(categoryId).populate('documents')

    if (!category) {
        throw createError(404, 'Категория не найдена')
    }

    category.documents.push({type, name, link})
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

    const document = category.documents[documentNumber]

    if (!document) {
        throw createError(404, 'Документ не найден')
    }

    fs.unlink(`${process.env.staticPath}\\${document.link}`, (err) => {
        if(err) console.log(err);
    })

    category.documents.splice(documentNumber, 1)

    await category.save()

    const documents = await exports.getDocumentsFromCategory(categoryId)

    return documents
}