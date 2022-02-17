const {validationResult} = require("express-validator");
const Tag = require('../models/Tag')
const TagService = require('../services/tag.service')

exports.get = async function (req, res) {
    try {
        const news = await TagService.get()
        res.json(news)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
}

exports.add = async function (req, res) {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Отсутствуют обязательные данные для добавления тега'
            })
        }

        const { name } = req.body

        const tags = await TagService.add(name)

        res.status(201).json({ message: 'Тег успешно добавлен', tags })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
}

exports.update = async function (req, res) {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Отсутствуют обязательные данные для редактирования тега'
            })
        }

        const { id } = req.params
        const { name } = req.body

        const tags = await TagService.update(id, name)

        res.status(201).json({ message: 'Тег успешно отредактирован', tags })
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

exports.delete = async function (req, res) {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Отсутствуют обязательные данные для удаления тега'
            })
        }

        const { id } = req.params

        const tags = await TagService.delete(id)

        return res.json({ message: 'Тег успешно удален', tags })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
}