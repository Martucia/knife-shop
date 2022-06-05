const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    likes: [{ type: Types.ObjectId, ref: "Like" }],
    owner: { type: Types.ObjectId, ref: 'User' },
})

module.exports = model('LikesList', schema)