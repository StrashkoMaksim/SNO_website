const {validationResult} = require("express-validator");
const CouncilService = require('../services/council.service')
const {errorHandler} = require("../utils/errorHandler");

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
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Отсутствуют обязательные данные для добавления члена совета'
            })
        }

        const { fio, department, position, phone} = req.body
        const { photo } = req.files

        const council = await CouncilService.add(fio, department, position, phone, photo)

        res.status(201).json({ message: 'Член совета успешно добавлен', council })
    } catch (e) {
        errorHandler(e, res)
    }
}

exports.update = async function (req, res) {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Отсутствуют обязательные данные для редактирования члена совета'
            })
        }

        const { id } = req.params
        const { fio, department, position, phone} = req.body
        const { photo } = req.files

        const council = await CouncilService.update(id, fio, department, position, phone, photo)

        res.status(201).json({ message: 'Член совета успешно отредактирован', council })
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
                message: 'Отсутствуют обязательные данные для удаления члена совета'
            })
        }

        const { id } = req.params

        const council = await CouncilService.delete(id)

        return res.json({ message: 'Член совета успешно удален', council })
    } catch (e) {
        errorHandler(e, res)
    }
}