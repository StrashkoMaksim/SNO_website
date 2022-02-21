const {validationResult} = require("express-validator");
const GrantsDocumentService = require('../services/grandsDocument.service')
const {errorHandler} = require("../utils/errorHandler");

exports.get = async function (req, res) {
    try {
        const documents = await GrantsDocumentService.get()
        res.json(documents)
    } catch (e) {
        errorHandler(e, res)
    }
}

exports.add = async function (req, res) {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Отсутствуют обязательные данные для добавления документа'
            })
        }

        const { name, link } = req.body
        const { file } = req.files

        const documents = await GrantsDocumentService.add(name, link, file)

        res.status(201).json({ message: 'Документ успешно добавлен', documents })
    } catch (e) {
        errorHandler(e, res)
    }
}

exports.delete = async function (req, res) {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Отсутствуют обязательные данные для удаления документа'
            })
        }

        const { id } = req.params

        const tags = await GrantsDocumentService.delete(id)

        return res.json({ message: 'Документ успешно удален', tags })
    } catch (e) {
        errorHandler(e, res)
    }
}