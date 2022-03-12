const News = require("../models/News")
const Tag = require('../models/Tag')
const { Types } = require("mongoose");
const createError = require("http-errors");
const { saveImg } = require("../utils/fileHelper");
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

exports.getDetail = async function (id) {
    if (!Types.ObjectId.isValid(id)) {
        throw createError(400, 'Некорректный ID новости')
    }

    const news = await News.findById(id).populate('tags').select('title content date tags')

    if (!news) {
        createError(404, 'Новости не существует')
    }

    return news
}

exports.getAdmin = async function (id) {
    if (!Types.ObjectId.isValid(id)) {
        throw createError(400, 'Некорректный ID новости')
    }

    const news = await News.findById(id)

    if (!news) {
        createError(404, 'Новости не существует')
    }

    return news
}

exports.filterByTag = async function (tagId, countStr, pageStr) {
    const { count, page } = validatePagination(countStr, pageStr)

    if (!Types.ObjectId.isValid(tagId)) {
        throw createError(400, 'Некорректный ID тега')
    }

    const news = await News.find({ tags: { _id: tagId } })
        .sort({ _id: -1 })
        .skip(count * (page - 1))
        .limit(10)
        .populate('tags')
        .select('title previewImg previewText date tags')

    return news
}

exports.add = async function (previewImg, title, previewText, content, contentImages, tagsArr) {
    const tags = await getTags(tagsArr)
    const contentArr = JSON.parse(content)

    if (contentArr.length < 1) {
        throw createError(400, 'Отсутствует контент')
    }

    const previewImgName = await saveImg(previewImg, 565, 300)
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
        tags
    })

    const savedNews = await news.save()

    if (savedNews.__v !== 0) {
        return false
    }

    return true
}

exports.update = async function (id, previewImg, title, previewText, content, contentImages, tagsArr) {
    if (!Types.ObjectId.isValid(id)) {
        throw createError(400, 'Некорректный ID новости')
    }

    const news = await News.findById(id)

    if (!news) {
        throw createError(404, 'Новость не найдена')
    }

    const tags = await getTags(tagsArr)
    const contentArr = JSON.parse(content)

    if (contentArr.length === 0) {
        throw createError(400, 'Отсутствует контент')
    }

    // Если поступила новая картинка для превью, то заменяем
    let previewImgName
    if (previewImg.size > 0) {
        fs.unlinkSync(`${process.env.staticPath}\\${news.get('previewImg')}`)
        previewImgName = await saveImg(previewImg, 565, 300)
    }

    // Удаление старых контентных картинок
    JSON.parse(news.get('content')).forEach(block => {
        if (block.type === 'image') {
            try {
                fs.unlinkSync(`${process.env.staticPath}\\${block.data.src}`)
            } catch (e) {
                console.log(e)
            }
        }
    })

    // Сохранение новых контентных картинок
    for (const block of contentArr) {
        if (block.type === 'image') {
            block.data.src = await saveImg(contentImages[block.id], 773)
        }
    }

    const savedNews = await News.replaceOne({ _id: id }, {
        previewImg: previewImgName || news.get('previewImg'),
        title,
        previewText,
        content: JSON.stringify(contentArr),
        date: news.get('date'),
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

    const news = await News.findById(id)

    if (!news) {
        throw createError(404, 'Новость не найдена')
    }

    // Удаление старых контентных картинок
    JSON.parse(news.get('content')).forEach(block => {
        if (block.type === 'image') {
            try {
                fs.unlinkSync(`${process.env.staticPath}\\${block.data.src}`)
            } catch (e) {
                console.log(e)
            }
        }
    })

    try {
        fs.unlinkSync(`${process.env.staticPath}\\${news.get('previewImg')}`)
    } catch (e) {
        console.log(e)
    }

    await news.delete()
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