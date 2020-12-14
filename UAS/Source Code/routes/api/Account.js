const { Router } = require('express')
const Account = require('../../models/Account')

const router = Router()

router.post('/register', async (req, res) => {
    const newAccount = new Account(req.body)
    try {
        const accountItem = await newAccount.save()
        if(!accountItem) {
            throw new Error('Something went wrong..')
        }
        res.status(200).json('Account created..')
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.get('/:uid', async (req, res) => {
    const uid = req.params.uid

    try {
        const account = await Account.findOne({uid: uid})
        if(!account) {
            throw new Error('Account not found..')
        }
        res.status(200).json(account)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.put('/:uid', async (req, res) => {
    const uid = req.params.uid
    
    try {
        const account = await Account.findOneAndUpdate({uid: uid}, req.body)
        if(!account) {
            throw new Error('Update failed..')
        }
        res.status(200).json(account)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.get('/:uid/cart', async (req, res) => {
    const uid = req.params.uid
    
    try {
        const cart = await Account.findOne({uid: uid}, {cart: 1})
        if(!cart) {
            throw new Error('Get cart failed..')
        }
        await cart.populate('cart.product').execPopulate()
        
        res.status(200).json(cart)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.post('/:uid/cart', async (req, res) => {
    const uid = req.params.uid
    let isAdded = false

    try {
        const item = await Account.findOne({uid: uid})
        for(let i=0; i<item.cart.length; i++) {
            if(item.cart[i].product == req.body.product) {
                item.cart[i].qty++
                item.save()
                isAdded = true
                break
            }
        }
        if(!isAdded) {
            item.cart.push(req.body)
            item.save()
        }
        if(!item) {
            throw new Error('Add to Cart failed..')
        }
        await item.populate('cart.product').execPopulate()

        res.status(200).json(item.cart)
    } catch(err) {
        console.log(err.message)
        res.status(500).json({message: err.message})
    }
})

router.delete('/:uid/cart/:id', async (req, res) => {
    const {uid, id} = req.params

    try {
        const account = await Account.findOneAndUpdate({uid: uid}, {
            $pull: {
                cart: {
                    product: id
                }
            }
        })
        if(!account) {
            throw new Error('Failed to delete cart item')
        }
        res.status(200).json('Delete cart item success')
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

module.exports = router