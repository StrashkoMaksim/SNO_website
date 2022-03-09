const Section = require("../models/Section")
const {Types} = require("mongoose");
const createError = require("http-errors");
const {saveImg, savePNG} = require("../utils/fileHelper");
const fs = require("fs");

exports.get = async function (countStr, pageStr) {
    const { count, page } = validatePagination(countStr, pageStr)

    const sections = await Section.find()
        .sort({ _id: -1 })
        .skip(count * (page - 1))
        .limit(count)
        .select('title logo previewText')


    return sections
}

exports.getDetail = async function (id) {
    if(!Types.ObjectId.isValid(id)) {
        throw createError(400, 'Некорректный ID кружка')
    }

    const sections = await Section.findById(id)

    if (!sections) {
        createError(404, 'Кружка не существует')
    }

    return sections
}

exports.add = async function (name, previewText, content, supervisor, schedule, achievements, logo, supervisorPhoto,
                              contentImages) {

    const savedLogo = await savePNG(logo, 221, 221)
    supervisor.photo = await saveImg(supervisorPhoto, 263, 173)

    const contentImagesMap = new Map()
    if (contentImages) {
        for (const contentImage of contentImages) {
            contentImagesMap.set(contentImage.name, contentImage)
        }
    }

    for (const block of content) {
        if (block.type === 'image') {
            block.data.src = await saveImg(contentImagesMap[block.id], 773)
        }
    }

    const achievementsArr = []
    if (achievements) {
        for (const achievement of achievements) {
            achievementsArr.push({
                previewImg: await saveImg(achievement, 10000, 200),
                img: await saveImg(achievement, 1200, 800)
            })
        }
    }

    const scheduleArr = []
    schedule.forEach(lesson => {
        scheduleArr.push(JSON.parse(lesson))
    })

    const section = new Section({
        name,
        previewText,
        logo: savedLogo,
        content: JSON.stringify(content),
        supervisor,
        schedule: scheduleArr,
        achievements: achievementsArr.reverse()
    })

    const savedSection = await section.save()

    if (savedSection.__v !== 0) {
        return false
    }

    return true
}

exports.update = async function (id, name, previewText, content, supervisor, schedule, achievements, logo,
                                 supervisorPhoto, contentImages) {

    const section = await Section.findById(id)

    if(!section) {
        throw createError(404, 'Кружок не найден, перезагрузите страницу')
    }

    // Если поступила новая картинка для превью, то заменяем
    let logoName
    if (logo) {
        fs.unlinkSync(`${process.env.staticPath}\\${section.get('logo')}`)
        logoName = await saveImg(previewImg, 565, 300)
    }

    if (content) {
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
        const contentImagesMap = new Map()
        if (contentImages) {
            for (const contentImage of contentImages) {
                contentImagesMap.set(contentImage.name, contentImage)
            }
        }
        for (const block of content) {
            if (block.type === 'image') {
                block.data.src = await saveImg(contentImagesMap[block.id], 773)
            }
        }
    }

    if (supervisorPhoto) {
        fs.unlinkSync(`${process.env.staticPath}\\${section.get('supervisor.photo')}`)
        const supervisorPhotoName = await saveImg(supervisorPhoto, 263, 173)

        if (supervisor) {
            supervisor.photo = supervisorPhotoName
        } else {
            section.supervisor.photo = supervisorPhotoName
        }
    }

    const achievementsArr = []
    if (achievements) {
        // Удаление старых достижений
        for(const achievement of section.get('achievements')) {
            fs.unlinkSync(`${process.env.staticPath}\\${achievement.previewImg}`)
            fs.unlinkSync(`${process.env.staticPath}\\${achievement.img}`)
        }
        // Добавление новых достижений
        for (const achievement of achievements) {
            achievementsArr.push({
                previewImg: await saveImg(achievement, 0, 200),
                img: await saveImg(achievement, 1200, 800)
            })
        }
    }

    const scheduleArr = []
    if (schedule) {
        schedule.forEach(lesson => {
            scheduleArr.push(JSON.parse(lesson))
        })
    }

    const savedSection = await Section.replaceOne({ _id: id }, {
        name: name || section.get('name'),
        previewText: previewText || section.get('previewText'),
        logo: logoName || section.get('logo'),
        content: content ? JSON.stringify(content) : section.get('content'),
        supervisor: supervisor || section.get('supervisor'),
        schedule: schedule.length > 0 ? scheduleArr : section.get('schedule'),
        achievements: achievements ? achievementsArr : section.get('achievements')
    })

    if (savedSection.modifiedCount !== 1) {
        return false
    }

    return true
}

exports.delete = async function (id) {
    const section = await Section.findById(id)

    if(!section) {
        throw createError(404, 'Кружок не найден')
    }

    // Удаление старых контентных картинок
    JSON.parse(section.get('content')).forEach(block => {
        if (block.type === 'image') {
            fs.unlinkSync(`${process.env.staticPath}\\${block.data.src}`)
        }
    })

    fs.unlinkSync(`${process.env.staticPath}\\${section.get('logo')}`)
    fs.unlinkSync(`${process.env.staticPath}\\${section.get('supervisor.photo')}`)

    for(const achievement of section.get('achievements')) {
        fs.unlinkSync(`${process.env.staticPath}\\${achievement.previewImg}`)
        fs.unlinkSync(`${process.env.staticPath}\\${achievement.img}`)
    }

    await section.delete()
}

const validatePagination = (countStr, pageStr) => {
    const count = countStr ? Number(countStr) : 8
    const page = pageStr ? Number(pageStr) : 1

    if (!Number.isInteger(count) || !Number.isInteger(page)) {
        throw createError(400, 'Некорректные параметры запроса')
    }

    return { count, page }
}