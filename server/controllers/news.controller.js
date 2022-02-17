const {validationResult} = require("express-validator");
const News = require('../models/News')
const NewsService = require('../services/news.service')

exports.get = async function (req, res) {
    try {
        const news = await NewsService.get()
        res.json(news)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
}

exports.getDetail = async function (req, res) {
    try {
        const news = await News.findById(req.params.id).populate('tag')
        res.json(news)
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
}

exports.filterByTag = async function (req, res) {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors[0].message
            })
        }

        const { tagId } = req.query

        const news = await NewsService.filterByTag(tagId)
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
                message: 'Отсутствуют обязательные данные для добавления статьи'
            })
        }

        const { previewImg, title, previewText, content, date, tags } = req.body

        const news = await NewsService.add(previewImg, title, previewText, content, date, tags)

        res.status(201).json({ message: 'Новость успешно добавлена', news })
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
                message: 'Отсутствуют обязательные данные для редактирования статьи'
            })
        }

        const { id } = req.params.id
        const { previewImg, title, previewText, content, date, tags } = req.body

        const news = await NewsService.update(id, previewImg, title, previewText, content, date, tags)

        res.status(201).json({ message: 'Новость успешно обновлена', news })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
}

exports.delete = async function (req, res) {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Отсутствуют обязательные данные для удаления статьи'
            })
        }

        const { id } = req.params.id

        const news = await NewsService.delete(id)

        return res.json({ message: 'Новость успешно удалена', news })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
}