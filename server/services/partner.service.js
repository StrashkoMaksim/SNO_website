const Partner = require('../models/Partner')
const {savePNG} = require("../utils/fileHelper");

exports.get = async function () {
    const partners = await Partner.find()

    return partners
}

exports.add = async function (img, link) {
    const imgName = await savePNG(img)

    const partner = new Partner({
        link,
        img: imgName
    })

    await partner.save()

    const partners = await exports.get()

    return partners
}

exports.delete = async function (id) {
    await Partner.findByIdAndDelete(id)

    const partners = await exports.get()

    return partners
}