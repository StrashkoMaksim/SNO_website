const {Schema, model} = require("mongoose");

const schema = new Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    organizerText: { type: String, required: true },
    organizerLink: { type: String, required: true }
})

module.exports = model('Event', schema)