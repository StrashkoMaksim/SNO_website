const { Schema, model } = require("mongoose");

const schema = new Schema({
    description: { type: String, required: true },
    image: { type: String, required: true },
    documents: [
        {
            type: { type: String, required: true },
            name: { type: String, required: true },
            link: { type: String, required: true }
        }
    ]
})

module.exports = model('Conference', schema)