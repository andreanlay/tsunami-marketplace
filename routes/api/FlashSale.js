const { Router } = require('express')
const FlashSale = require('../../models/FlashSale')

const router = Router()

router.get('/:time', async (req, res) => {
    const time = req.params.time

    try {
        const products = await FlashSale.find({
            start_time: {
                $lte: time
            },
            end_time: {
                $gte: time
            }
        }).populate('product')
         
        if(!products) {
            throw new Error('Flash Sale product not found..')
        }
        res.status(200).json(products)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.post('/add', async (req, res) => {
    const flashSale = new FlashSale(req.body)
    
    try {
        const FlashSaleItem = await flashSale.save()
        if(!FlashSaleItem) {
            throw new Error('Save Flash Sale Failed..')
        }
        res.status(200).json(FlashSaleItem)
    } catch(err) {
        console.log(err.message)
        res.status(500).json({message: err.message})
    }
})

module.exports = router