const TagService = require('../services/tag.service')
const {errorHandler, errorValidator} = require("../utils/errorHandler")

exports.get = async function (req, res) {
    try {
        const tags = await TagService.get()
        res.json(tags)
    } catch (e) {
        errorHandler(e, res)
    }
}

exports.add = async function (req, res) {
    try {
        errorValidator(req, res)

        const { name } = req.body
        const tags = await TagService.add(name)

        res.status(201).json({ message: 'Тег успешно добавлен', tags })
    } catch (e) {
        errorHandler(e, res)
    }
}

exports.update = async function (req, res) {
    try {
        errorValidator(req, res)

        const { id } = req.params
        const { name } = req.body

        const tags = await TagService.update(id, name)

        res.status(201).json({ message: 'Тег успешно отредактирован', tags })
    } catch (e) {
        errorHandler(e, res)
    }
}

exports.delete = async function (req, res) {
    try {
        errorValidator(req, res)

        const { id } = req.params
        const tags = await TagService.delete(id)

        return res.json({ message: 'Тег успешно удален', tags })
    } catch (e) {
        errorHandler(e, res)
    }
}