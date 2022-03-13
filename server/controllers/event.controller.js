const EventService = require('../services/event.service')
const { errorHandler, errorValidator} = require("../utils/errorHandler")

exports.get = async function (req, res) {
    try {
        const events = await EventService.get()
        res.json(events)
    } catch (e) {
        errorHandler(e, res)
    }
}

exports.add = async function (req, res) {
    try {
        errorValidator(req, res)

        const { name, date, organizerText, organizerLink } = req.body

        const events = await EventService.add(name, date, organizerText, organizerLink)

        res.status(201).json({ message: 'Мероприятие успешно добавлено', events })
    } catch (e) {
        errorHandler(e, res)
    }
}

exports.update = async function (req, res) {
    try {
        errorValidator(req, res)

        const { id } = req.params
        const { name, date, organizerText, organizerLink } = req.body

        const events = await EventService.update(id, name, date, organizerText, organizerLink)

        res.status(201).json({ message: 'Мероприятие успешно отредактировано', events })
    } catch (e) {
        errorHandler(e, res)
    }
}

exports.delete = async function (req, res) {
    try {
        errorValidator(req, res)

        const { id } = req.params

        const events = await EventService.delete(id)

        return res.status(201).json({ message: 'Мероприятие успешно удалено', events })
    } catch (e) {
        errorHandler(e, res)
    }
}