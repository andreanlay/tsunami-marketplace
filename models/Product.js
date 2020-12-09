const { Schema, model } = require('mongoose')

const ProductSchema = new Schema({
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'account',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    detailed_description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    sold: {
        type: Number,
        required: true
    },
    specifications: {
        type: Array,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    posted_date: {
        type: Date,
        required: true
    },
    flashsale: {
        sold: Number,
        stock: Number,
        price: Number,
        start_time: Date,
        end_time: Date
    },
    dailydeals: {
        price: Number,
        date: Date
    }
})

const Product = model('product', ProductSchema)

module.exports = Product