const { validationResult } = require("express-validator");
const NewsService = require('../services/news.service')
const { errorHandler } = require("../utils/errorHandler");

exports.get = async function (req, res) {
    try {
        const { page, count } = req.query

        const news = await NewsService.get(count, page)

        res.json(news)
    } catch (e) {
        errorHandler(e, res)
    }
}

exports.getDetail = async function (req, res) {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors[0].message
            })
        }

        const { id } = req.params

        const news = await NewsService.getDetail(id)
        res.json(news)
    } catch (e) {
        errorHandler(e, res)
    }
}

exports.getAdmin = async function (req, res) {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors[0].message
            })
        }

        const { id } = req.params

        const news = await NewsService.getAdmin(id)
        res.json(news)
    } catch (e) {
        errorHandler(e, res)
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

        const { page, count } = req.query
        const { tagId } = req.params

        const news = await NewsService.filterByTag(tagId, count, page)
        res.json(news)
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
                message: 'Отсутствуют обязательные данные для добавления статьи'
            })
        }

        const { title, previewText, content, tags } = req.body
        const { previewImg, ...contentImages } = req.files

        if (!await NewsService.add(previewImg, title, previewText, content, contentImages, tags)) {
            throw Error()
        }

        res.status(201).json({ message: 'Новость успешно добавлена' })
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
                message: 'Отсутствуют обязательные данные для редактирования статьи'
            })
        }

        const { id } = req.params
        const { title, previewText, content, tags } = req.body
        const { previewImg, ...contentImages } = req.files

        if (!await NewsService.update(id, previewImg, title, previewText, content, contentImages, tags)) {
            throw Error()
        }

        res.status(201).json({ message: 'Новость успешно обновлена' })
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
                message: 'Отсутствуют обязательные данные для удаления статьи'
            })
        }

        const { id } = req.params

        await NewsService.delete(id)

        return res.json({ message: 'Новость успешно удалена' })
    } catch (e) {
        errorHandler(e, res)
    }
}