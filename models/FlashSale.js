const { Schema, model } = require('mongoose')

const FlashSaleSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId, ref: 'product',
        required: true,
    },
    sold: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    start_time: {
        type: Date,
        required: true
    },
    end_time: {
        type: Date,
        required: true
    }
})

const FlashSale = model('flashsale', FlashSaleSchema)

module.exports = FlashSale