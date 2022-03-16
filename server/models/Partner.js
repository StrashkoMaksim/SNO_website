const {Schema, model} = require("mongoose");

const schema = new Schema({
    img: { type: String, required: true },
    link: { type: String, required: true }
})

module.exports = model('Partner', schema)