const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const { PORT, mongoUri } = require('./config')
const app = express()

const authRoute = require('./routes/api/Auth.js')
const addressRoute = require('./routes/api/Address.js')
const productRoute = require('./routes/api/Product.js')

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

app.use('/api/auth', authRoute)
app.use('/api/address', addressRoute)
app.use('/api/product', productRoute)

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`))