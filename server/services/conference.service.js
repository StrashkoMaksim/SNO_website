const Conference = require('../models/Conference')
const createError = require("http-errors")
const fs = require("fs")
const { saveImg } = require("../utils/fileHelper")
const validUrl = require("valid-url");
const { saveFile } = require("../utils/fileHelper")

exports.get = async function () {
    const conference = await Conference.find().sort({ $natural: -1 }).limit(1);

    return conference
}

exports.getAll = async function () {
    const conferences = await Conference.find().sort({ $natural: -1 })

    return conferences
}

exports.add = async function (description, image) {
    const savedImage = await saveImg(image, undefined, 850)

    const conference = new Conference({ description, image: savedImage })

    const savedConference = await conference.save()

    if (savedConference.__v !== 0) {
        throw Error()
    }

    const exp_Conference = await exports.get()

    return exp_Conference
}

exports.update = async function (id, description, image) {
    const conference = await Conference.findById(id)

    if (!conference) {
        throw createError(404, 'Конференция не найдена')
    }

    let photoName
    if (image) {
        try {
            
            fs.unlinkSync(`${process.env.staticPath}\\${conference.get('image')}`)
        } catch (e) {
            console.log(e)
        }

        photoName = await saveImg(image, undefined, 850)
    }

    const savedConference = await Conference.updateOne({ _id: id }, {
        description,
        image: photoName 
    })

    if (savedConference.modifiedCount !== 1) {
        throw Error()
    }

    const exp_Conference = await exports.get()

    return exp_Conference
}

exports.delete = async function (id) {
    const conference = await Conference.findById(id)

    try {
        fs.unlinkSync(`${process.env.staticPath}\\${conference.get('image')}`)
    } catch (e) {
        console.log(e)
    }

    try {
        conference.get('documents').forEach(document => {
            if (document.type !== 'link') {
                fs.unlink(`${process.env.staticPath}\\${document.link}`, (err) => {
                    if (err) console.log(err);
                })
            }
        })
    }
    catch (e) {
        console.log(e)
    }

    await conference.deleteOne()

    const exp_Conference = await exports.get()

    return exp_Conference
}

exports.getDocumentsFromConference = async function (conferenceId) {
    const documents = await Conference.findById(conferenceId).select('documents').populate('documents')

    return documents
}

exports.addDocumentInConference = async function (conferenceId, name, link, file, type = 'link') {
    const conference = await Conference.findById(conferenceId).populate('documents')

    if (!conference) {
        throw createError(404, 'Конференция не найдена')
    }
    if (!file && !link) {
        throw createError(400, 'Отсутствует ссылка или файл')
    } else if (file) {
        saveFile(file).then((response) => {
            const type = response.resultType
            const link = response.resultLink

            conference.get('documents').push({ type, name, link })
        })
    } else {
        if (!validUrl.isUri(link)) {
            throw createError(400, 'Некорректная ссылка')
        }
        conference.get('documents').push({ type, name, link })

    }

    await conference.save()

    const documents = await exports.getDocumentsFromConference(conferenceId)

    return documents
}

exports.deleteDocumentInConference = async function (conferenceId, documentNumber) {
    const conference = await Conference.findById(conferenceId)

    if (!conference) {
        throw createError(404, 'Конференция не найдена')
    }

    const document = conference.get('documents')[documentNumber]

    if (!document) {
        throw createError(404, 'Документ не найден')
    }

    if (document.type !== 'link') {
        fs.unlink(`${process.env.staticPath}\\${document.link}`, (err) => {
            if (err) console.log(err);
        })
    }

    conference.get('documents').splice(documentNumber, 1)

    await conference.save()

    const documents = await exports.getDocumentsFromConference(conferenceId)

    return documents
}