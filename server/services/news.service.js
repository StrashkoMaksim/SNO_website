const News = require("../models/News")
const Tag = require('../models/Tag')

exports.get = async function () {
    try {
        const news = await News.find().sort({ _id: -1 }).limit(10).populate('tags')

        return news
    } catch (e) {
        throw Error('Что-то пошло не так, попробуйте снова')
    }
}

exports.filterByTag = async function (tagId) {
    try {
        const news = await News.find({ "tag._id": tagId }).sort({ _id: -1 }).limit(12).populate('tags')

        return news
    } catch (e) {
        throw Error('Что-то пошло не так, попробуйте снова')
    }
}

exports.add = async function (previewImg, title, previewText, content, date, tags) {
    try {
        const tagsPromises = []

        tags.forEach(tagId => {
            const tagPromise = Tag.findById(tagId)
            tagsPromises.push(tagPromise)
        })

        const resultTags = await Promise.all(tagsPromises)

        const news = new News({
            previewImg,
            title,
            previewText,
            content: JSON.stringify(content),
            date,
            tags: resultTags
        })

        await news.save()

        console.log(1)

        const resultNews = await exports.get()

        console.log(resultNews)

        return resultNews
    } catch (e) {
        console.log(e.message)
        throw Error('Что-то пошло не так, попробуйте снова')
    }
}

exports.update = async function (id, previewImg, title, previewText, content, date, tags) {
    try {
        const news = await News.findById(id)

        if(!news) {
            throw new Error('Новость не найдена')
        }

        const tagsIdArr = JSON.parse(tags)
        const tagsPromises = []

        tagsIdArr.forEach(tagId => {
            const tagPromise = Tag.findById(tagId)
            tagsPromises.push(tagPromise)
        })

        const resultTags = await Promise.all(tagsPromises)


        await News.replaceOne({ _id: id }, {
            previewImg,
            title,
            previewText,
            content,
            date,
            tags: resultTags
        })

        await news.save()

        const resultNews = await exports.get()

        return resultNews
    } catch (e) {
        throw Error('Что-то пошло не так, попробуйте снова')
    }
}

exports.delete = async function (id) {
    try {
        await News.findByIdAndDelete(id)

        const resultNews = await exports.get()

        return resultNews
    } catch (e) {
        throw Error('Что-то пошло не так, попробуйте снова')
    }
}