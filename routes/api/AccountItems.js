const { Router } = require('express')
const AccountItem = require('../../modules/Account')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const accounts = await AccountItem.find()
        if(!accounts)
            throw new Error('No accounts present..')
        res.status(200).json(accounts)
    } catch(error) {
        res.status(500).json({message: error.message})
    }
})

router.post('/', async (req, res) => {
    const newAccount = new AccountItem(req.body)
    try {
        const account = await newAccount.save()
        if(!account)
            throw new Error('Something went wrong..')
        res.status(200).json(account)
    } catch(error) {
        res.status(500).json({message: error.message})
    }
})

module.exports = router