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

router.post('/logout', async (req, res) => {

})

module.exports = router