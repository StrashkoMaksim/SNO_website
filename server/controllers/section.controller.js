const SectionService = require('../services/section.service')
const { errorHandler, errorValidator} = require("../utils/errorHandler")

exports.get = async function (req, res) {
    try {
        const { page, count } = req.query

        const sections = await SectionService.get(count, page)

        res.json(sections)
    } catch (e) {
        errorHandler(e, res)
    }
}

exports.getDetail = async function (req, res) {
    try {
        errorValidator(req, res)

        const { id } = req.params

        const sections = await SectionService.getDetail(id)
        res.json(sections)
    } catch (e) {
        errorHandler(e, res)
    }
}

exports.add = async function (req, res) {
    try {
        errorValidator(req, res)

        const { name, previewText, content, supervisor, supervisorPhoto, schedule, achievements, logo,
            contentImages } = req.body

        if (!await SectionService.add(name, previewText, content, supervisor, schedule, achievements, logo,
            supervisorPhoto, contentImages)) {

            throw Error()
        }

        res.status(201).json({ message: 'Кружок успешно добавлен' })
    } catch (e) {
        errorHandler(e, res)
    }
}

exports.update = async function (req, res) {
    try {
        errorValidator(req, res)

        const { id } = req.params
        const { name, previewText, content, supervisor, supervisorPhoto, schedule, achievements, logo,
            contentImages, achievementsDelete } = req.body
            
        if (!await SectionService.update(id, name, previewText, content, supervisor, schedule, achievements, logo,
            supervisorPhoto, contentImages, achievementsDelete)) {
            throw Error()
        }

        res.status(201).json({ message: 'Кружок успешно обновлен' })
    } catch (e) {
        errorHandler(e, res)
    }
}

exports.delete = async function (req, res) {
    try {
        errorValidator(req, res)

        const { id } = req.params
        await SectionService.delete(id)

        return res.json({ message: 'Кружок успешно удален' })
    } catch (e) {
        errorHandler(e, res)
    }
}