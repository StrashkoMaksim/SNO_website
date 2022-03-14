const News = require("../models/News")
const Tag = require('../models/Tag')
const { Types } = require("mongoose")
const createError = require("http-errors")
const { saveImg } = require("../utils/fileHelper")
const fs = require("fs")

exports.get = async function (countStr, pageStr, tag, search) {
    let searchReg
    if (search) {
        searchReg = new RegExp(search, 'i')
    } else {
        searchReg = ''
    }

    const searchQuery = {
        $and: [
            {$or: [
                {title: {$regex: searchReg}},
                {previewText: {$regex: searchReg}}
            ]}
        ]
    }

    if (tag) {
        if (!await Tag.findById(tag)) {
            throw createError(404, 'Выбранный тег не найден')
        }

        searchQuery.$and.push({
            tags: {_id: tag}
        })
    }

    const count = countStr ? Number(countStr) : 10
    const page = pageStr ? Number(pageStr) : 1

    const news = await News.find(searchQuery)
        .sort({ _id: -1 })
        .skip(count * (page - 1))
        .limit(count)
        .populate('tags')
        .select('title previewImg previewText date tags')

    const totalCount = await News.find(searchQuery).count()

    return { news, totalCount }
}

exports.getDetail = async function (id) {
    const news = await News.findById(id).populate('tags').select('title content date tags')

    if (!news) {
        createError(404, 'Новости не существует')
    }

    return news
}

exports.getAdmin = async function (id) {
    const news = await News.findById(id)

    if (!news) {
        createError(404, 'Новости не существует')
    }

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