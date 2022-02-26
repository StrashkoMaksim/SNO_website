const News = require("../models/News")
const Tag = require('../models/Tag')
const {Types} = require("mongoose");
const createError = require("http-errors");
const {saveImg} = require("../utils/fileHelper");
const fs = require("fs");

exports.get = async function (countStr, pageStr) {
    const { count, page } = validatePagination(countStr, pageStr)

    const news = await News.find()
        .sort({ _id: -1 })
        .skip(count * (page - 1))
        .limit(count)
        .populate('tags')
        .select('title previewImg previewText date tags')


    return news
}

exports.filterByTag = async function (tagId, countStr, pageStr) {
    const { count, page } = validatePagination(countStr, pageStr)

    if(!Types.ObjectId.isValid(tagId)) {
        throw createError(400, 'Некорректный ID тега')
    }

    const news = await News.find({ tags: {_id: tagId} })
        .sort({ _id: -1 })
        .skip(count * (page - 1))
        .limit(10)
        .populate('tags')
        .select('title previewImg previewText date tags')

    return news
}

exports.add = async function (previewImg, title, previewText, content, contentImages, date, tagsArr) {
    const previewImgName = await saveImg(previewImg, 565, 300)
    const tags = await getTags(tagsArr)

    const contentArr = JSON.parse(content)

    for (const block of contentArr) {
        if (block.type === 'image') {
            block.data.src = await saveImg(contentImages[block.id], 773)
        }
    }

    const news = new News({
        previewImg: previewImgName,
        title,
        previewText,
        content: JSON.stringify(contentArr),
        date,
        tags
    })

    const savedNews = await news.save()

    if (savedNews.__v !== 0) {
        return false
    }

    return true
}

exports.update = async function (id, previewImg, title, previewText, content, contentImages, date, tagsArr) {
    if (!Types.ObjectId.isValid(id)) {
        throw createError(400, 'Некорректный ID новости')
    }

    const news = await News.findById(id)

    if(!news) {
        throw createError(404, 'Новость не найдена')
    }

    fs.unlinkSync(`${process.env.staticPath}\\${news.get('previewText')}`)

    const previewImgName = await saveImg(previewImg, 565, 300)
    const tags = await getTags(tagsArr)

    const contentArr = JSON.parse(content)

    for (const block of contentArr) {
        if (block.type === 'image') {
            block.data.src = await saveImg(contentImages[block.id], 773)
        }
    }

    const savedNews = await News.replaceOne({ _id: id }, {
        previewImg: previewImgName,
        title,
        previewText,
        content: JSON.stringify(contentArr),
        date,
        tags
    })

    if (savedNews.modifiedCount !== 1) {
        return false
    }

    return true
}

exports.delete = async function (id) {
    if (!Types.ObjectId.isValid(id)) {
        throw createError(400, 'Некорректный ID новости')
    }

    await News.findByIdAndDelete(id)
}

const validatePagination = (countStr, pageStr) => {
    const count = countStr ? Number(countStr) : 10
    const page = pageStr ? Number(pageStr) : 1

    if (!Number.isInteger(count) || !Number.isInteger(page)) {
        throw createError(400, 'Некорректные параметры запроса')
    }

    return { count, page }
}

const getTags = async (tagsIdJSON) => {
    const tagsPromises = []
    const tagsIdArr = JSON.parse(tagsIdJSON)

    tagsIdArr.forEach(tagId => {
        if (!Types.ObjectId.isValid(tagId)) {
            throw createError(400, 'Некорректный ID тега')
        }

        const tagPromise = Tag.findById(tagId)
        tagsPromises.push(tagPromise)
    })

    return await Promise.all(tagsPromises)
}