const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    owner: {type: Types.ObjectId, ref: 'Basket'},
    count: {type: Number, default: 1}
})

module.exports = model('BasketProduct', schema)