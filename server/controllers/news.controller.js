const NewsService = require('../services/news.service')
const { errorHandler, errorValidator} = require("../utils/errorHandler")

exports.get = async function (req, res) {
    try {
        errorValidator(req, res)

        const { page, count, tag, search } = req.query

        const { news, totalCount } = await NewsService.get(count, page, tag, search)

        res.json({ news, count: totalCount })
    } catch (e) {
        errorHandler(e, res)
    }
}

exports.getDetail = async function (req, res) {
    try {
        errorValidator(req, res)

        const { id } = req.params

        const news = await NewsService.getDetail(id)
        res.json(news)
    } catch (e) {
        errorHandler(e, res)
    }
}

exports.getAdmin = async function (req, res) {
    try {
        errorValidator(req, res)

        const { id } = req.params

        const news = await NewsService.getAdmin(id)
        res.json(news)
    } catch (e) {
        errorHandler(e, res)
    }
}

exports.add = async function (req, res) {
    try {
        errorValidator(req, res)

        const { title, previewText, content, tags, previewImg, contentImages } = req.body

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
        errorValidator(req, res)

        const { id } = req.params
        const { title, previewText, content, tags, previewImg, contentImages } = req.body

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
        errorValidator(req, res)

        const { id } = req.params

        await NewsService.delete(id)

        return res.json({ message: 'Новость успешно удалена' })
    } catch (e) {
        errorHandler(e, res)
    }
}