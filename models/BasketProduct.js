const { Schema, model, Types } = require('mongoose')


const schema = new Schema({
    data: { type: Types.ObjectId, ref: "Product" },
    count: { type: Number, default: 1 },
    owner: {type: Types.ObjectId, ref: "Basket"}
})

module.exports = model('BasketProduct', schema)