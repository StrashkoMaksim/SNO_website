const CouncilService = require('../services/council.service')
const {errorHandler, errorValidator} = require("../utils/errorHandler")

exports.get = async function (req, res) {
    try {
        const council = await CouncilService.get()
        res.json(council)
    } catch (e) {
        errorHandler(e, res)
    }
}

exports.add = async function (req, res) {
    try {
        errorValidator(req, res)

        const { lastName, firstAndMiddleName, department, position, phone} = req.body
        const { photo } = req.files

        const council = await CouncilService.add(lastName, firstAndMiddleName, department, position, phone, photo)

        res.status(201).json({ message: 'Член совета успешно добавлен', council })
    } catch (e) {
        errorHandler(e, res)
    }
}

exports.update = async function (req, res) {
    try {
        errorValidator(req, res)

        const { id } = req.params
        const { lastName, firstAndMiddleName, department, position, phone} = req.body
        const { photo } = req.files

        const council = await CouncilService.update(id, lastName, firstAndMiddleName, department, position, phone, photo)

        res.status(201).json({ message: 'Член совета успешно отредактирован', council })
    } catch (e) {
        errorHandler(e, res)
    }
}

exports.delete = async function (req, res) {
    try {
        errorValidator(req, res)

        const { id } = req.params

        const council = await CouncilService.delete(id)

        return res.json({ message: 'Член совета успешно удален', council })
    } catch (e) {
        errorHandler(e, res)
    }
}