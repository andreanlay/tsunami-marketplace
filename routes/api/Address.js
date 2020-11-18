const { Router } = require('express')
const Address = require('../../models/Address')

const router = Router()

router.get('/:uid', async(req, res) => {
    const uid = req.params.uid

    try {
        const address = await Address.find({owner_uid: uid})
        if(!address) {
            throw new Error('No address with such owner')
        }
        res.status(200).json(address)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.post('/add', async(req, res) => {
    const newAddress = new Address(req.body)

    try {
        const AddressItem = await newAddress.save()
        if(!AddressItem) {
            throw new Error('Something went wrong...')
        }
        res.status(200).json('Address added...')
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

module.exports = router