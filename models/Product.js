const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    size: {type: String, required: true},
    material: {type: String, required: true},
    manufacture: {type: String, required: true},
    steel: {type: String, required: true},
    handle: {type: String, required: true},
    guardback: {type: String, required: true},
    gilding: {type: Boolean, default: false},   
    trademark: {type: String, required: true},
    serie: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    onsale: {type: Boolean, default: false}, 
    rate: {type: Number, default: 5},
    reviews: [{type: Types.ObjectId, ref: 'Review'}]
})

module.exports = model('Product', schema)

// vendor: {type: String, required: true, unique: true},