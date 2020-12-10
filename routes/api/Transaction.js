const { Router } = require('express')
const Transaction = require('../../models/Transaction')
const Product = require('../../models/Product')

const router = Router()

router.get('/:id', async (req, res) => {
    const id = req.params.id
    
    try {
        let transactions = await Transaction.find()
        
        if(!transactions) {
            throw new Error('Error when trying to find transactions..')
        }

        for(let i=0; i<transactions.length; i++) {
            await transactions[i].populate('cart.product').execPopulate()
            await transactions[i].populate('cart.product.seller').execPopulate()
            await transactions[i].populate('shipping_address').execPopulate()

            if(transactions[i].buyer_id != id) {
                carts = transactions[i].cart
                transactions[i].cart = carts.filter(item => item.product.seller == id)
            }
        }
        transactions = transactions.filter(transaction => transaction.cart.length != 0)

        res.status(200).json(transactions)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.get('/:seller_id/sales', async (req, res) => {
    const seller_id = req.params.seller_id

    let sales = []
    try {
        const transactions = await Transaction.find().sort({date: -1}).populate('cart.product')

        if(!transactions) {
            throw new Error('Fail to fetch transactions..')
        }

        transactions.forEach(transaction => {
            transaction.cart.forEach(item => {
                if(item.product.seller == seller_id) {
                    sales.push({
                        transaction_id: transaction._id,
                        transaction_date: transaction.date,
                        product_name: item.product.name,
                        qty: item.qty,
                        total: item.qty * item.price,
                    })
                }
            })
        })

        res.status(200).json(sales)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.post('/', async (req, res) => {
    const transaction = await new Transaction(req.body)

    try {
        const TransactionItem = await transaction.save()

        if(!TransactionItem) {
            throw new Error('Fail to save transaction..')
        }

        // Decrement each bought product's stock
        req.body.cart.forEach(async item => {
            await Product.findOneAndUpdate({_id: item.product}, {
                $inc: {
                    
                    sold: item.qty,
                    stock: -item.qty   
                }
            })
            
            await Product.findOneAndUpdate({_id: item.product}, {
                'flashsale': {
                    $ne: null
                },
                $inc: {
                    'flashsale.sold': item.qty
                }
            })
        })

        res.status(200).json(TransactionItem)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.put('/:id/review', async (req, res) => {
    const id = req.params.id

    try {
        const TransactionItem = await Transaction.findOneAndUpdate(
            {
                _id: id
            },
            {
                $set: {
                    'cart.$[el].review': true
                }
            },
            {
                arrayFilters: [{'el.product': req.body.product}],
                new: true
            }
        )

        await TransactionItem.populate('cart.product').execPopulate()
        await TransactionItem.populate('cart.product.seller').execPopulate()
        await TransactionItem.populate('shipping_address').execPopulate()

        if(!TransactionItem) {
            throw new Error('Fail to update transaction')
        }
        res.status(200).json(TransactionItem)
    } catch(err) {
        console.log(err.message)
        res.status(500).json({message: err.message})
    }
})

module.exports = router