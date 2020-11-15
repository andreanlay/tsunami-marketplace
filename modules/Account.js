const { Schema, model} = require('mongoose')

const AccountSchema = new Schema({
    uid: {
        type: String,
        unique: true,
        required: true,
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
    },
    phone_number: {
        type: String,
        required: true,
    },
})

const Account = model('accounts', AccountSchema)

module.exports = Account