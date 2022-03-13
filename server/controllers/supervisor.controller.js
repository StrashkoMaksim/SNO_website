const {validationResult} = require("express-validator");
const SupervisorService = require('../services/supervisor.service')
const {errorHandler, errorValidator} = require("../utils/errorHandler");

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
        errorValidator(req, res)

        const { lastName, firstAndMiddleName, department, position, phone, photo} = req.body
        const supervisors = await SupervisorService.add(lastName, firstAndMiddleName, department, position, phone, photo)

        res.status(201).json({ message: 'Руководитель успешно добавлен', supervisors })
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

        const supervisors = await SupervisorService.update(id, lastName, firstAndMiddleName, department, position, phone, photo)

        res.status(201).json({ message: 'Руководитель успешно отредактирован', supervisors })
    } catch (e) {
        errorHandler(e, res)
    }
}

exports.delete = async function (req, res) {
    try {
        errorValidator(req, res)

        const { id } = req.params

        const supervisors = await SupervisorService.delete(id)

        return res.json({ message: 'Руководитель успешно удален', supervisors })
    } catch (e) {
        errorHandler(e, res)
    }
}