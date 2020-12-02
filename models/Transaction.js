const { Schema, model } = require('mongoose')
const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const TransactionSchema = new Schema({
    _id: {
        Number
    },
    buyer_id: {
        type: Schema.Types.ObjectId,
        ref: 'account',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        default: 'Processing'
    },
    shipping_address: {
        type: Schema.Types.ObjectId,
        ref: 'addresses',
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    cart: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'product'
            },
            price: Number,
            qty: Number,
        }
    ]
}, {_id: false})

TransactionSchema.plugin(AutoIncrement)

const Transaction = model('transaction', TransactionSchema)

module.exports = Transaction