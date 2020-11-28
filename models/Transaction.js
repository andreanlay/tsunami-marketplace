const { Schema, model } = require('mongoose')

const TransactionSchema = new Schema({

})

const Transaction = model('transaction', TransactionSchema)

module.exports = Transaction