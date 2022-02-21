const Council = require('../models/Council')
const createError = require("http-errors");
const {Types} = require("mongoose");
const fs = require("fs");
const {saveImg} = require("../utils/fileHelper");

exports.get = async function () {
    const council = await Council.find()

    return council
}

exports.add = async function (fio, department, position, phone, photo) {
    const photoName = await saveImg(photo, 263, 173)

    const councilMember = new Council({ fio, department, position, phone, photo: photoName })

    const savedCouncilMember = await councilMember.save()

    if (savedCouncilMember.__v !== 0) {
        throw Error()
    }

    const council = await exports.get()

    return council
}

exports.update = async function (id, fio, department, position, phone, photo) {
    if (!Types.ObjectId.isValid(id)) {
        throw createError(400, 'Некорректный ID члена совета')
    }

    const councilMember = await Council.findById(id)

    if(!councilMember) {
        throw createError(404, 'Член совета не найден')
    }

    fs.unlinkSync(`${process.env.staticPath}\\${councilMember.get('photo')}`)

    const photoName = await saveImg(photo, 263, 173)

    const savedCouncilMember = await Council.replaceOne({ _id: id }, {
        fio,
        department,
        position,
        phone,
        photo: photoName
    })

    if (savedCouncilMember.modifiedCount !== 1) {
        throw Error()
    }

    const council = await exports.get()

    return council
}

exports.delete = async function (id) {
    if (!Types.ObjectId.isValid(id)) {
        throw createError(400, 'Некорректный ID члена совета')
    }

    const councilMember = await Council.findById(id)

    fs.unlinkSync(`${process.env.staticPath}\\${councilMember.get('photo')}`)

    await councilMember.deleteOne()

    const council = await exports.get()

    return council
}