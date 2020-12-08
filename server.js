const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const { PORT, mongoUri } = require('./config')
const path = require('path')
const app = express()

const accountRoute = require('./routes/api/Account')
const addressRoute = require('./routes/api/Address.js')
const productRoute = require('./routes/api/Product.js')
const postRoute = require('./routes/api/Post')
const transactionRoute = require('./routes/api/Transaction')

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use(fileUpload())

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(() => console.log('Connected to MongoDB Atlas.'))
  .catch((err) => console.log(err))

app.use('/api/account', accountRoute)
app.use('/api/address', addressRoute)
app.use('/api/product', productRoute)
app.use('/api/post', postRoute)
app.use('/api/transaction', transactionRoute)

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  })
}

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`))