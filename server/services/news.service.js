const News = require("../models/News")
const Tag = require('../models/Tag')
const createError = require("http-errors")
const { saveImg, saveContent, deleteContentImages} = require("../utils/fileHelper")
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
    const news = await News.findById(id).populate('tags').select('title previewText content date tags')

    if (!news) {
        createError(404, 'Новости не существует')
    }

    return news
}

exports.getAdmin = async function (id) {
    const news = await News.findById(id).populate('tags')

    if (!news) {
        createError(404, 'Новости не существует')
    }

    return news
}

exports.add = async function (previewImg, title, previewText, content, contentImages, tagsArr) {
    const previewImgName = await saveImg(previewImg, 565, 300)
    const savedContent = await saveContent(content, contentImages)

    let tags
    if (tagsArr) {
        tags = await getTags(tagsArr)
    }

    const news = new News({
        previewImg: previewImgName,
        title,
        previewText,
        content: JSON.stringify(savedContent),
        tags: tags || []
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

    // Если поступила новая картинка для превью, то заменяем
    let previewImgName
    if (previewImg) {
        try {
            fs.unlinkSync(`${process.env.staticPath}\\${news.get('previewImg')}`)
        } catch (e) {
            console.log(e)
        }
        previewImgName = await saveImg(previewImg, 565, 300)
    }

    let savedContent
    if (content) {
        await deleteContentImages(news)
        savedContent = await saveContent(content, contentImages)
    }

    let tags
    if (tagsArr) {
        tags = await getTags(tagsArr)
    }

    const savedNews = await News.replaceOne({ _id: id }, {
        previewImg: previewImgName || news.get('previewImg'),
        title,
        previewText,
        content: JSON.stringify(savedContent),
        date: news.get('date'),
        tags: tags || news.get('tags')
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

const getTags = async (tagsIdArr) => {
    const tagsPromises = []

    tagsIdArr.forEach(tagId => {
        const tagPromise = Tag.findById(tagId)
        tagsPromises.push(tagPromise)
    })

    return await Promise.all(tagsPromises)
}