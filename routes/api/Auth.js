const { Router } = require('express')
const Account = require('../../modules/Account')

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

module.exports = router