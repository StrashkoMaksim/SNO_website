const Tag = require('../models/Tag')
const createError = require("http-errors")

exports.get = async function () {
    const tags = await Tag.find()

    return tags
}

exports.add = async function (name) {
    const tag = new Tag({name})

    await tag.save()

    const tags = await exports.get()

    return tags
}

exports.update = async function (id, name) {
    const tag = await Tag.findById(id)

    if(!tag) {
        throw createError(404, 'Тег не найден')
    }

    const savedTags = await Tag.replaceOne({ _id: id }, {name})

    if (savedTags.modifiedCount !== 1) {
        throw Error()
    }

    const tags = await exports.get()

    return tags
}

exports.delete = async function (id) {
    await Tag.findByIdAndDelete(id)

    const tags = await exports.get()

    return tags
}