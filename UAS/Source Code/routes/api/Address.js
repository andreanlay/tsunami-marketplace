const { Router } = require('express')
const Address = require('../../models/Address')

const router = Router()

router.get('/:uid', async (req, res) => {
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

router.post('/add', async (req, res) => {
    const newAddress = new Address(req.body)

    try {
        const AddressItem = await newAddress.save()
        if(!AddressItem) {
            throw new Error('Something went wrong...')
        }
        res.status(200).json(AddressItem)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.put('/setdefault/:id', async (req, res) => {
    const id = req.params.id

    try {
        await Address.findOneAndUpdate({is_default: true}, {is_default: false})
        const newAddress = await Address.findOneAndUpdate({_id: id}, {is_default: true})
        if(!newAddress) {
            throw new Error('Error while updating new address..')
        }
        res.status(200).json("Set default success!")
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

module.exports = router