const Council = require('../models/Council')
const createError = require("http-errors")
const fs = require("fs")
const {saveImg} = require("../utils/fileHelper")

exports.get = async function () {
    const council = await Council.find()

    return council
}

exports.add = async function (lastName, firstAndMiddleName, department, position, phone, photo) {
    const photoName = await saveImg(photo, 263, 173)

    const councilMember = new Council({ lastName, firstAndMiddleName, department, position, phone, photo: photoName })

    const savedCouncilMember = await councilMember.save()

    if (savedCouncilMember.__v !== 0) {
        throw Error()
    }

    const council = await exports.get()

    return council
}

exports.update = async function (id, lastName, firstAndMiddleName, department, position, phone, photo) {
    const councilMember = await Council.findById(id)

    if(!councilMember) {
        throw createError(404, 'Член совета не найден')
    }

    let photoName
    if (photo) {
        try {
            fs.unlinkSync(`${process.env.staticPath}\\${councilMember.get('photo')}`)
        } catch (e) {
            console.log(e)
        }

        photoName = await saveImg(photo, 263, 173)
    }

    const savedCouncilMember = await Council.replaceOne({ _id: id }, {
        lastName,
        firstAndMiddleName,
        department,
        position,
        phone,
        photo: photoName || councilMember.get('photo')
    })

    if (savedCouncilMember.modifiedCount !== 1) {
        throw Error()
    }

    const council = await exports.get()

    return council
}

exports.delete = async function (id) {
    const councilMember = await Council.findById(id)

    try {
        fs.unlinkSync(`${process.env.staticPath}\\${councilMember.get('photo')}`)
    } catch (e) {
        console.log(e)
    }

    await councilMember.deleteOne()

    const council = await exports.get()

    return council
}