const Tag = require('../models/Tag')

exports.get = async function () {
    const tags = await Tag.find()

    return tags
}

exports.add = async function (name) {
    try {
        const tag = new Tag({name})

        await tag.save()

        const tags = await exports.get()

        return tags
    } catch (e) {
        throw Error('Что-то пошло не так, попробуйте снова')
    }
}

exports.update = async function (id, name) {
    try {
        const tag = await Tag.findById(id)

        if(!tag) {
            throw new Error('Тег не найден')
        }

        await Tag.replaceOne({ _id: id }, {name})

        await tag.save()

        const tags = await exports.get()

        return tags
    } catch (e) {
        throw Error(e.message)
    }
}

exports.delete = async function (id) {
    try {
        await Tag.findByIdAndDelete(id)

        const tags = await exports.get()

        return tags
    } catch (e) {
        throw Error(e.message)
    }
}