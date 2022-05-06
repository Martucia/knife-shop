const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    // name: {type: String, required: true},
    // price: {type: Number, required: true},
    owner: {type: Types.ObjectId, ref: 'User'},
    products: [{type: Types.ObjectId, ref: 'BasketProduct'}]
})

module.exports = model('Basket', schema)