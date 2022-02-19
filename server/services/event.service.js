const Event = require('../models/Event')
const createError = require("http-errors");
const {Types} = require("mongoose");

exports.get = async function () {
    const events = await Event.find()

    return events
}

exports.add = async function (name, date, organizerText, organizerLink) {
    const event = new Event({ name, date, organizerText, organizerLink })

    await event.save()

    const events = await exports.get()

    return events
}

exports.update = async function (id, name, date, organizerText, organizerLink) {
    if (!Types.ObjectId.isValid(id)) {
        throw createError(400, 'Некорректный ID мероприятия')
    }

    const tag = await Event.findById(id)

    if(!tag) {
        throw createError(404, 'Мероприятие не найдено')
    }

    const savedEvent = await Event.replaceOne({ _id: id }, {
        name,
        date,
        organizerText,
        organizerLink
    })

    if (savedEvent.modifiedCount !== 1) {
        throw Error()
    }

    const tags = await exports.get()

    return tags
}

exports.delete = async function (id) {
    if (!Types.ObjectId.isValid(id)) {
        throw createError(400, 'Некорректный ID мероприятия')
    }

    await Event.findByIdAndDelete(id)

    const tags = await exports.get()

    return tags
}