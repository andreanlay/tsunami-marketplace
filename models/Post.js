const { Schema, model } = require('mongoose')

const PostSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    poster: {
        type: Schema.Types.ObjectId,
        ref: 'account',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    posted_date: {
        type: Date,
        required: true
    },
    review: {
        type: String
    },
    replies: [{
        type: Schema.Types.ObjectId,
        ref: 'post'
    }]
})

const Post = model('post', PostSchema)

module.exports = Post