const {Schema, model} = require("mongoose");

const schema = new Schema({
    fio: { type: String, required: true },
    department: { type: String, required: true },
    position: { type: String, required: true },
    phone: { type: String, required: true },
    photo: { type: String, required: true }
})

module.exports = model('Supervisor', schema)