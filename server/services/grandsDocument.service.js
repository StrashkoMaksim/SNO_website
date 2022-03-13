const GrantsDocument = require('../models/GrantsDocument')
const createError = require("http-errors")
const {saveFile} = require("../utils/fileHelper")
const fs = require("fs")
const validUrl = require('valid-url')

exports.get = async function () {
    const documents = await GrantsDocument.find()

    return documents
}

exports.add = async function (name, link, file, type = 'link') {
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

    const document = new GrantsDocument({ name, link, type })

    await document.save()

    const documents = await exports.get()

    return documents
}

exports.delete = async function (id) {
    const document = await GrantsDocument.findById(id)

    if (document && document.get('type') !== 'link') {
        fs.unlink(`${process.env.staticPath}\\${document.link}`, (err) => {
            if(err) console.log(err);
        })
    }

    await GrantsDocument.findByIdAndDelete(id)

    const documents = await exports.get()

    return documents
}