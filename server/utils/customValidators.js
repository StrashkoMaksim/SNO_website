const {Types} = require("mongoose");

exports.checkArrayJPG = (arr) => {
    for (let file of arr) {
        if (!exports.checkJPG(file)) {
            return false
        }
    }

    return true
}

exports.parseJSON = (json) => {
    return JSON.parse(json)
}

exports.checkSupervisor = (supervisor) => {
    if (!supervisor.lastName || !supervisor.firstAndMiddleName || !supervisor.department || !supervisor.position ||
        !supervisor.phone) {
        return false
    }
    return true
}

exports.checkSchedule = (schedule) => {
    if (schedule.length < 1) {
        return false
    }

    for (const lessonJSON of schedule) {
        const lesson = JSON.parse(lessonJSON)

        if (!lesson.day || !(lesson.week === 'numerator' || lesson.week === 'denominator' ||
            lesson.week === 'numerator/denominator') || !lesson.time || !lesson.classroom) {
            return false
        }
    }

    return true
}

exports.isObjectId = (id) => {
    if (!Types.ObjectId.isValid(id)) {
        return false
    }
    return true
}

exports.checkArrayObjectId = (arr) => {
    arr.forEach(tag => {
        if(!exports.isObjectId(tag)) {
            return false
        }
    })
    return true
}

exports.checkJPG = (file) => {
    if (file.name.substring(file.name.length - 4).toLowerCase() !== '.jpg') {
        return false
    }
    return true
}

exports.checkPNG = (file) => {
    if (file.name.substring(file.name.length - 4).toLowerCase() !== '.png') {
        return false
    }
    return true
}