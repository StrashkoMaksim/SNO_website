const {validationResult} = require("express-validator");
const SupervisorService = require('../services/supervisor.service')
const {errorHandler} = require("../utils/errorHandler");

exports.get = async function (req, res) {
    try {
        const supervisors = await SupervisorService.get()
        res.json(supervisors)
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
                message: 'Отсутствуют обязательные данные для добавления руководителя'
            })
        }

        const { fio, department, position, phone} = req.body
        const { photo } = req.files

        const supervisors = await SupervisorService.add(fio, department, position, phone, photo)

        res.status(201).json({ message: 'Руководитель успешно добавлен', supervisors })
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
                message: 'Отсутствуют обязательные данные для редактирования руководителя'
            })
        }

        const { id } = req.params
        const { fio, department, position, phone} = req.body
        const { photo } = req.files

        const supervisors = await SupervisorService.update(id, fio, department, position, phone, photo)

        res.status(201).json({ message: 'Руководитель успешно отредактирован', supervisors })
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
                message: 'Отсутствуют обязательные данные для удаления руководителя'
            })
        }

        const { id } = req.params

        const supervisors = await SupervisorService.delete(id)

        return res.json({ message: 'Руководитель успешно удален', supervisors })
    } catch (e) {
        errorHandler(e, res)
    }
}