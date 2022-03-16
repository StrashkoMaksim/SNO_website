const PartnerService = require('../services/partner.service')
const {errorHandler, errorValidator} = require("../utils/errorHandler")

exports.get = async function (req, res) {
    try {
        const partners = await PartnerService.get()
        res.json(partners)
    } catch (e) {
        errorHandler(e, res)
    }
}

exports.add = async function (req, res) {
    try {
        errorValidator(req, res)

        const { img, link } = req.body
        const partners = await PartnerService.add(img, link)

        res.status(201).json({ message: 'Партнер успешно добавлен', partners })
    } catch (e) {
        errorHandler(e, res)
    }
}

exports.delete = async function (req, res) {
    try {
        errorValidator(req, res)

        const { id } = req.params
        const partners = await PartnerService.delete(id)

        return res.json({ message: 'Партнер успешно удален', partners })
    } catch (e) {
        errorHandler(e, res)
    }
}