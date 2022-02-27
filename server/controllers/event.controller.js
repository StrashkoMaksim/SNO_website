const { validationResult } = require("express-validator");
const EventService = require('../services/event.service')
const { errorHandler } = require("../utils/errorHandler");

exports.get = async function (req, res) {
    try {
        const news = await EventService.get()
        res.json(news)
    } catch (e) {
        errorHandler(e, res)
    }
}

exports.add = async function (req, res) {
    try {
        const errors = validationResult(req)
        console.log(errors)

        if (!errors.isEmpty()) {
            res.status(400).json({
                errors: errors.array(),
                message: 'Отсутствуют обязательные данные для добавления мероприятия'
            })
            return;
        }

        const { name, date, organizerText, organizerLink } = req.body

        const tags = await EventService.add(name, date, organizerText, organizerLink)

        res.status(201).json({ message: 'Мероприятие успешно добавлено', tags })
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
                message: 'Отсутствуют обязательные данные для редактирования мероприятия'
            })
        }

        const { id } = req.params
        const { name, date, organizerText, organizerLink } = req.body

        const tags = await EventService.update(id, name, date, organizerText, organizerLink)

        res.status(201).json({ message: 'Мероприятие успешно отредактировано', tags })
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
                message: 'Отсутствуют обязательные данные для удаления мероприятия'
            })
        }

        const { id } = req.params

        const tags = await EventService.delete(id)

        return res.json({ message: 'Мероприятие успешно удалено', tags })
    } catch (e) {
        errorHandler(e, res)
    }
}