const GrantsDocumentService = require('../services/grandsDocument.service')
const { errorHandler, errorValidator } = require("../utils/errorHandler")

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
        errorValidator(req, res)

        const { name, link, type } = req.body
        const { file } = req.files

        const documents = await GrantsDocumentService.add(name, link, file, type)

        res.status(201).json({ message: 'Документ успешно добавлен', documents })
    } catch (e) {
        errorHandler(e, res)
    }
}

exports.delete = async function (req, res) {
    try {
        errorValidator(req, res)

        const { id } = req.params

        const tags = await GrantsDocumentService.delete(id)

        return res.json({ message: 'Документ успешно удален', tags })
    } catch (e) {
        errorHandler(e, res)
    }
}