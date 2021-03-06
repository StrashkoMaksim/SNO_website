const Supervisor = require('../models/Supervisor')
const createError = require("http-errors")
const fs = require("fs")
const { saveImg } = require("../utils/fileHelper")

exports.get = async function () {
    const supervisors = await Supervisor.find()

    return supervisors
}

exports.add = async function (lastName, firstAndMiddleName, department, position, phone, photo) {

    const photoName = await saveImg(photo, 263, 173)

    const supervisor = new Supervisor({ lastName, firstAndMiddleName, department, position, phone, photo: photoName })

    const savedSupervisor = await supervisor.save()

    if (savedSupervisor.__v !== 0) {
        throw Error()
    }

    const supervisors = await exports.get()

    return supervisors
}

exports.update = async function (id, lastName, firstAndMiddleName, department, position, phone, photo) {
    const supervisor = await Supervisor.findById(id)

    if (!supervisor) {
        throw createError(404, 'Руководитель не найден')
    }

    let photoName
    if (photo) {
        try {
            fs.unlinkSync(`${process.env.staticPath}\\${supervisor.get('photo')}`)
        } catch (e) {
            console.log(e)
        }

        photoName = await saveImg(photo, 263, 173)
    }

    const savedSupervisor = await Supervisor.replaceOne({ _id: id }, {
        lastName,
        firstAndMiddleName,
        department,
        position,
        phone,
        photo: photoName || supervisor.get('photo')
    })

    if (savedSupervisor.modifiedCount !== 1) {
        throw Error()
    }

    const supervisors = await exports.get()

    return supervisors
}

exports.delete = async function (id) {
    const supervisor = await Supervisor.findById(id)

    try {
        fs.unlinkSync(`${process.env.staticPath}\\${supervisor.get('photo')}`)
    } catch (e) {
        console.log(e)
    }

    await supervisor.deleteOne()

    const supervisors = await exports.get()

    return supervisors
}