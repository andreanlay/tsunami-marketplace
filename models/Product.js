const { Schema, model } = require('mongoose')

const ProductSchema = new Schema({
    seller_uid: {
        type: String,
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
    specifications: {
        type: Array,
        required: true
    }
})

const Product = model('product', ProductSchema)

module.exports = Product