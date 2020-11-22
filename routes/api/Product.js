const { Router } = require('express')
const multer = require('multer')
const Product = require('../../models/Product')

const router = Router()

router.get('/:uid', async (req, res) => {
    const uid = req.params.uid

    try {
        const products = await Product.find({seller_uid: uid})
        if(!products) {
            throw new Error('Product not found..')
        }
        res.status(200).json(products)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

function generateImgName(file_name) {
    const name = file_name.substring(0, file_name.lastIndexOf('.'))
    const ext = file_name.substring(file_name.lastIndexOf('.') + 1)

    return `${name}_${Date.now()}.${ext}`
}

router.post('/add', async (req, res) => {
    req.body['images'] = []

    try {
        // CASE 1: Multi file upload 
        req.files.file.forEach(img => {
            // Preprocess String to get image name and extension
            name = generateImgName(img.name)
            
            // Push preprocessed image name to body before storing it to database
            req.body['images'].push(name)
    
            // Save image locally for best performance
            img.mv(`${__dirname}/../../client/public/uploads/${name}`)
        })
    } catch(err) {
        // CASE 2: Single file upload
        img = req.files.file

        name = generateImgName(img.name)
        req.body['images'].push(name)
        
        img.mv(`${__dirname}/../../client/public/uploads/${name}`)
    }

    const newProduct = new Product(req.body)

    try {
        const ProductItem = await newProduct.save()
        if(!ProductItem) {
            throw new Error('Fail to save product..')
        }
        res.status(200).json('Save success..')
    } catch(err) {
        console.log(err.message)
        res.status(500).json({message: err.message})
    }
})

router.put('/:id', async (req, res) => {
    const productID = req.params.id

    try {
        const updatedProduct = await Product.findOneAndUpdate({_id: productID}, req.body)
        if(!updatedProduct) {
            throw new Error('Fail to update product..')
        }
        res.status(200).json('Update success..')
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

module.exports = router