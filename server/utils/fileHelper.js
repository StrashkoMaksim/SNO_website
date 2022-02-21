const createError = require("http-errors");
const uuid = require("uuid");
const sharp = require("sharp");

exports.saveImg = async (photo, width, height) => {
    if (!photo) {
        throw createError(400, 'Отсутствует фотография')
    }

    if (photo.name.substring(photo.name.length - 4) !== '.jpg') {
        throw createError(400, 'Некорректный формат картинки')
    }

    const photoName = `${uuid.v4()}.jpg`

    await sharp(`${process.env.tempPath}\\${photo.path.split('\\')[2]}`)
        .resize(width, height)
        .toFile(`${process.env.staticPath}\\${photoName}`)

    return photoName
}