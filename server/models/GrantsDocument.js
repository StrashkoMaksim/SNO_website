const {Schema, model} = require("mongoose");

const schema = new Schema({
    type: {type: String, required: true},
    name: {type: String, required: true},
    link: {type: String, required: true}
})

module.exports = model('GrantsDocument', schema)