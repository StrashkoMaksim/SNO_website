const {Schema, model} = require("mongoose");

const schema = new Schema({
    name: { type: String, required: true },
    logo: { type: String, required: true },
    previewText: { type: String, require: true },
    content: { type: String, required: true },
    supervisor: {
        fio: { type: String, required: true },
        department: { type: String, required: true },
        position: { type: String, required: true },
        phone: { type: String, required: true },
        photo: { type: String, required: true }
    },
    schedule: [
        {
            day: { type: String, required: true },
            time: { type: String, required: true },
            classroom: { type: String, required: true }
        }
    ],
    achievements: [
        {
            previewImg: { type: String, required: true },
            img: { type: String, required: true }
        }
    ]
})

module.exports = model('Section', schema)