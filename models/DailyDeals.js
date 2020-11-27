const { Schema, model } = require('mongoose')

const DailyDealSchema = new Schema({
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
    date: {
        type: String,
        required: true
    }
})

const DailyDeals = model('dailydeal', DailyDealSchema)

module.exports = DailyDeals