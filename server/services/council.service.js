const Council = require('../models/Council')
const createError = require("http-errors");
const {Types} = require("mongoose");
const sharp = require("sharp");
const uuid = require('uuid')
const fs = require("fs");

exports.get = async function () {
    const council = await Council.find()

    return council
}

exports.add = async function (fio, department, position, phone, photo) {
    const photoName = await saveImg(photo)

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

    const photoName = await saveImg(photo)

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

const saveImg = async (photo) => {
    if (!photo) {
        throw createError(400, 'Отсутствует фотография')
    }

    if (photo.name.substring(photo.name.length - 4) !== '.jpg') {
        throw createError(400, 'Некорректный формат картинки')
    }

    const photoName = `${uuid.v4()}.jpg`

    await sharp(`${process.env.tempPath}\\${photo.path.split('\\')[2]}`)
        .resize(263, 173)
        .toFile(`${process.env.staticPath}\\${photoName}`)

    return photoName
}