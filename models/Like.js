const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    data: { type: Types.ObjectId, ref: "Product" }
})

module.exports = model('Like', schema)
