const createError = require("http-errors")
const uuid = require("uuid")
const sharp = require("sharp")
const fs = require("fs")

exports.saveImg = async (photo, width, height) => {
    if (!photo) {
        throw createError(400, 'Отсутствует фотография')
    }

    if (photo.name.substring(photo.name.length - 4).toLowerCase() !== '.jpg') {
        throw createError(400, 'Некорректный формат картинки')
    }

    const photoName = `${uuid.v4()}.jpg`

    await sharp(`${process.env.tempPath}\\${photo.path.split('\\')[2]}`)
        .resize({ width: width, height: height, fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
        .toFile(`${process.env.staticPath}\\${photoName}`)

    return photoName
}

exports.savePNG = async (photo, width, height) => {
    if (!photo) {
        throw createError(400, 'Отсутствует фотография')
    }

    if (photo.name.substring(photo.name.length - 4).toLowerCase() !== '.png') {
        throw createError(400, 'Некорректный формат картинки')
    }

    const photoName = `${uuid.v4()}.png`

    await sharp(`${process.env.tempPath}\\${photo.path.split('\\')[2]}`)
        .flatten(true)
        .flatten({ background: { r: 255, g: 255, b: 255 } })
        .resize(width, height)
        .toFile(`${process.env.staticPath}\\${photoName}`)

    return photoName
}

exports.saveFile = async (file) => {
    const fileNameArr = file.name.split('.')
    const resultType = fileNameArr[fileNameArr.length - 1].toLowerCase()

    if (resultType !== 'pdf' && resultType !== 'docx' && resultType !== 'doc') {
        throw createError(400, 'Недопустимый тип файла. Попробуйте PDF, DOCX, DOC.')
    }

    const resultLink = `${uuid.v4()}.${resultType}`

    await fs.readFile(`${process.env.tempPath}\\${file.path.split('\\')[2]}`,
        async (err, data) => {
            if (err) throw err

            await fs.writeFile(`${process.env.staticPath}\\${resultLink}`, data, (err) => {
                if (err) throw err
            })
        }
    )

    return { resultType, resultLink }
}

exports.saveContent = async (content, contentImages) => {
    const contentImagesMap = new Map()
    if (contentImages) {
        for (const contentImage of contentImages) {
            contentImagesMap.set(contentImage.name, contentImage)
        }

        for (const block of content) {
            if (block.type === 'image') {
                block.data.src = await exports.saveImg(contentImagesMap.get(block.id + '.jpg'), 773)
            }
        }
    }

    return content
}

exports.deleteContentImages = async (document) => {
    JSON.parse(document.get('content')).forEach(block => {
        if (block.type === 'image') {
            try {
                fs.unlinkSync(`${process.env.staticPath}\\${block.data.src}`)
            } catch (e) {
                console.log(e)
            }
        }
    })
}