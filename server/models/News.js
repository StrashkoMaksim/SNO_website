const {Schema, model, Types} = require("mongoose");

const schema = new Schema({
    previewImg: { type: String, required: true },
    title: { type: String, required: true },
    previewText: { type: String, require: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now() },
    tags: [{ type: Types.ObjectId, ref: 'Tag' }]
})

module.exports = model('News', schema)