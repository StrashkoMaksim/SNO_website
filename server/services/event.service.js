const Event = require('../models/Event')
const createError = require("http-errors")

exports.get = async function (pageStr, countStr, oldEvents) {

    const count = countStr ? Number(countStr) : 10
    const page = pageStr ? Number(pageStr) : 1

    let events, totalCount
    const today = new Date()

    if (oldEvents !== undefined) {

        if (oldEvents === 'true') {
            totalCount = await Event.find().count()

            events = await Event.find()
                .sort({ date: 1 })
                .skip(count * (page - 1))
                .limit(count)
        }
        else {
            totalCount = await Event.find({ date: { $gt: today.toISOString() } }).count()

            events = await Event.find({ date: { $gt: today.toISOString() } })
                .sort({ date: 1 })
                .skip(count * (page - 1))
                .limit(count)
        }

    }


    return { events, totalCount }
}

exports.add = async function (name, date, organizerText, organizerLink) {
    const event = new Event({ name, date, organizerText, organizerLink })
    await event.save()

    const events = await exports.get()
    return events
}

exports.update = async function (id, name, date, organizerText, organizerLink) {
    const tag = await Event.findById(id)

    if (!tag) {
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
    await Event.findByIdAndDelete(id)

    const tags = await exports.get()

    return tags
}