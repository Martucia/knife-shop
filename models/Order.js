const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    data: { 
        adress: {type: String, required: true},
        city: {type: String, required: true},
        index: {type: Number, required: true},
        name: {type: String, required: true},
        secname: {type: String, required: true},
        number: {type: Number, required: true},
    },
    products: [{ type: Types.ObjectId, ref: "Product" }],
})

module.exports = model('Order', schema)