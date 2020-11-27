const { Router } = require('express')
const DailyDeals = require('../../models/DailyDeals')

const router = Router()

router.get('/:date', async (req, res) => {
    const date = req.params.date

    try {
        const products = await DailyDeals.find({
            deals_date: date
        }).populate('product')
        if(!products) {
            throw new Error('Product not found..')
        }
        res.status(200).json(products)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.post('/add', async (req, res) => {
    const dailyDeals = await new DailyDeals(req.body)

    try {
        const DailyDealsItem = await dailyDeals.save()
        if(!DailyDealsItem) {
            throw new Error('Save Daily Deals failed..')
        }
        res.status(200).json('Save success..')
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

module.exports = router