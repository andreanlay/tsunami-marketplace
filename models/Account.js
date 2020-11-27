const { Schema, model } = require('mongoose')

const AccountSchema = new Schema({
    uid: {
        type: String,
        unique: true,
        required: true,
    },
    gender: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true,
    },
    member: {
        type: String,
    },
    PIN: {
        type: Number,
        default: null
    },
    seller: {
        name: {
            type: String,
            default: 'Not set'
        },
        location: {
            type: String,
            default: 'Not Set'
        },
        products_sold: {
            type: Number,
        },
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
})

const Account = model('account', AccountSchema)

module.exports = Account