const ConferenceServise = require('../services/conference.service')
const { errorHandler, errorValidator } = require("../utils/errorHandler")

exports.get = async function (req, res) {
    try {
        const conference = await ConferenceServise.get()
        res.json(conference)
    } catch (e) {
        errorHandler(e, res)
    }
}

exports.getAll = async function (req, res) {
    try {
        const conference = await ConferenceServise.getAll()
        res.json(conference)
    } catch (e) {
        errorHandler(e, res)
    }
}

exports.add = async function (req, res) {
    try {
        errorValidator(req, res)

        const { description, image } = req.body

        const conference = await ConferenceServise.add(description, image)

        res.status(201).json({ message: 'Конференция успешно добавлена', conference })
    } catch (e) {
        errorHandler(e, res)
    }
}

exports.update = async function (req, res) {
    try {
        errorValidator(req, res)

        const { conferenceId } = req.params
        const { description, image } = req.body

        const conference = await ConferenceServise.update(conferenceId, description, image)

        res.status(201).json({ message: 'Конференция успешно отредактирована', conference })
    } catch (e) {
        errorHandler(e, res)
    }
}

exports.delete = async function (req, res) {
    try {
        errorValidator(req, res)

        const { conferenceId } = req.params

        const conference = await ConferenceServise.delete(conferenceId)

        return res.json({ message: 'Член совета успешно удален', conference })
    } catch (e) {
        errorHandler(e, res)
    }
}

exports.addDocumentInConference = async function (req, res) {
    try {
        errorValidator(req, res)
        const { conferenceId } = req.params
        const { name, link, type } = req.body
        const { file } = req.files

        const documents = await ConferenceServise.addDocumentInConference(conferenceId, name, link, file, type)
        res.json(documents)
    } catch (e) {
        errorHandler(e, res)
    }
}

exports.deleteDocumentInConference = async function (req, res) {
    try {
        errorValidator(req, res)

        const { conferenceId, documentNumber } = req.params

        const documents = await ConferenceServise.deleteDocumentInConference(conferenceId, documentNumber)
        res.json(documents)
    } catch (e) {
        errorHandler(e, res)
    }
}