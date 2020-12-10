const { Router } = require('express')
const Product = require('../../models/Product')

const router = Router()

function getCurrentTime() {
    return Date.now()
}

function getCurrentDate() {
    return new Date(Date.now()).setHours(0, 0, 0, 0)
}

router.get('/', async (req, res) => {
    const currentTime = getCurrentTime()
    const currentDate = getCurrentDate()

    try {
        await Product.updateMany(
            {
                $or: [
                    { 'flashsale.end_time': { $lte: currentTime } },
                    { 'dailydeals.date': { $lt: currentDate } }
                ]
            },
            {
                flashsale: null,
                dailydeals: null
            }
        )

        const products = await Product.find({
            $and: [
                {
                    flashsale: null
                },
                {
                    dailydeals: null
                }
            ]
        }).sort({posted_date: -1}).limit(25)

        for(let product of products) {
            await product.populate('seller').execPopulate()
        }

        if(!products) {
            throw new Error('Product not found..')
        }
        res.status(200).json(products)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.get('/details/:id', async (req, res) => {
    const id = req.params.id

    try {
        const product = await Product.findOne({_id: id})

        if(!product) {
            throw new Error('Product not found..')
        }
        res.status(200).json(product)
    } catch(err) {
        res.status(500).json({message: err.message})   
    }
})

router.get('/search/:query', async (req, res) => {
    const query = req.params.query

    try {
        const products = await Product.find({
            name: {
                $regex: query,
                $options: 'i'
            }
        })
        
        for(let product of products) {
            await product.populate('seller').execPopulate()
        }

        if(!products) {
            throw new Error('No product with such keyword..')
        }
        res.status(200).json(products)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const products = await Product.find({seller: id})
        if(!products) {
            throw new Error('Product not found..')
        }
        res.status(200).json(products)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.post('/add', async (req, res) => {    
    const newProduct = new Product(req.body)

    try {
        const ProductItem = await newProduct.save()
        if(!ProductItem) {
            throw new Error('Fail to save product..')
        }
        res.status(200).json(ProductItem)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.put('/edit/:id', async (req, res) => {
    const productID = req.params.id

    try {
        const updatedProduct = await Product.findOneAndUpdate({_id: productID}, req.body, {new: true})
        if(!updatedProduct) {
            throw new Error('Fail to update product..')
        }

        res.status(200).json(updatedProduct)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id

    try {
        const deletedProduct = await Product.findOneAndDelete({_id: id})
        if(!deletedProduct) {
            throw new Error('Fail to delete product..')
        }
        res.status(200).json('Delete success')
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.post('/flashsale/add/:id', async (req, res) => {
    const id = req.params.id

    try {
        const productItem = await Product.findOneAndUpdate({_id: id}, req.body)
        if(!productItem) {
            throw new Error('Fail to add flash sale event..')
        }
        res.status(200).json('Add success')
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.get('/flashsale', async (req, res) => {
    const time = getCurrentTime()

    try {
        const products = await Product.find({
            'flashsale.start_time': {
                $lte: time
            },
            'flashsale.end_time': {
                $gte: time
            }
        })
         
        if(!products) {
            throw new Error('Flash Sale product not found..')
        }
        res.status(200).json(products)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.post('/dailydeals/add/:id', async (req, res) => {
    const id = req.params.id
    
    try {
        const productItem = await Product.findOneAndUpdate({_id: id}, req.body)
        if(!productItem) {
            throw new Error('Fail to add daily deals item..')
        }
        res.status(200).json(productItem)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.get('/dailydeals', async (req, res) => {
    const date = getCurrentDate()

    try {
        const products = await Product.find({
            'dailydeals.date': date
        })
        if(!products) {
            throw new Error('Daily Deals product not found..')
        }
        res.status(200).json(products)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.get('/:seller_id/views', async (req, res) => {
    const seller_id = req.params.seller_id
    let views = 0

    try {
        const products = await Product.find({seller: seller_id})
        products.forEach(product => {
            views += product.views
        })
        res.status(200).json(views)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.post('/:id/view', async (req, res) => {
    const product_id = req.params.id

    try {
        const productItem = await Product.findOneAndUpdate(
            {
                _id: product_id
            },
            {
                $inc: {
                    views: 1
                }
            }
        )

        if(!productItem) {
            throw new Error('Fail to update product view..')
        }

        res.status(200).json('View updated.')
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

module.exports = router