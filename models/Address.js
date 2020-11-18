const { Schema, model} = require('mongoose')

const AddressSchema = new Schema({
    owner_uid: {
        type: String,
        required: true,
    },
    default: {
        default: false,
    },
    name: String,
    phone_number: String,
    shipping_address: String,
    details: [{
        province: String,
        cityregency: String,
        district: String,
        subdistrict: String,
        coordinates: String
    }]
})

const Address = model('addresses', AddressSchema)

module.exports = Address