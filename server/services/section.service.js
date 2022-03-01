const Section = require("../models/Section")
const {Types} = require("mongoose");
const createError = require("http-errors");
const {saveImg} = require("../utils/fileHelper");
const fs = require("fs");

exports.get = async function (countStr, pageStr) {
    const { count, page } = validatePagination(countStr, pageStr)

    const news = await Section.find()
        .sort({ _id: -1 })
        .skip(count * (page - 1))
        .limit(count)
        .select('title logo previewText')


    return news
}

exports.getDetail = async function (id) {
    if(!Types.ObjectId.isValid(id)) {
        throw createError(400, 'Некорректный ID кружка')
    }

    const news = await Section.findById(id)

    if (!news) {
        createError(404, 'Кружка не существует')
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

    const news = new Section({
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

    const news = await Section.findById(id)

    if(!news) {
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

    const savedNews = await Section.replaceOne({ _id: id }, {
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

    const news = await Section.findById(id)

    if(!news) {
        throw createError(404, 'Новость не найдена')
    }

    // Удаление старых контентных картинок
    JSON.parse(news.get('content')).forEach(block => {
        if (block.type === 'image') {
            fs.unlinkSync(`${process.env.staticPath}\\${block.data.src}`)
        }
    })

    fs.unlinkSync(`${process.env.staticPath}\\${news.get('previewImg')}`)

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