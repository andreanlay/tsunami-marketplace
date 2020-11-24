const { Router } = require('express')
const sharp = require('sharp')
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

function generateImgPath(name) {
    return `${__dirname}/../../client/public/uploads/${name}`
}

function resizeAndSave(img, path) {
    sharp(img.data).resize(250, 180, {fit: 'fill'})
                   .toFile(path)
}

function preprocessImage(req) {
    try {
        // CASE 1: Multi file upload 
        req.files.file.forEach(img => {
            // Preprocess String to get image name and extension
            name = generateImgName(img.name)
            path = generateImgPath(name)
            
            // Push preprocessed image name to body before storing it to database
            req.body['images'].push({
                name: name,
                path: `/uploads/${name}`
            })
            

            // Resize image to 250 x 180 and save it
            resizeAndSave(img, path)
        })
    } catch(err) {
        // CASE 2: Single file upload
        img = req.files.file

        name = generateImgName(img.name)
        path = generateImgPath(name)

        req.body['images'].push({
            name: name,
            path: `/uploads/${name}`
        })

        resizeAndSave(img, path)
    }
}

router.post('/add', async (req, res) => {
    // Reverse JSON.stringify()
    req.body.specifications = JSON.parse(req.body.specifications)
    req.body['images'] = []
    
    preprocessImage(req)
    
    const newProduct = new Product(req.body)

    try {
        const ProductItem = await newProduct.save()
        if(!ProductItem) {
            throw new Error('Fail to save product..')
        }
        res.status(200).json(ProductItem)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.put('/edit/:id', async (req, res) => {
    const productID = req.params.id
    
    // Reverse JSON Stringified deletedImages link
    req.body.deletedImages = JSON.parse(req.body.deletedImages)

    const currentProductState = await Product.findOne({_id: productID})

    console.log(currentProductState.images)

    for(let i=currentProductState.images.length - 1; i>=0; i--) {
        for(let j=0; j<req.body.deletedImages.length; j++) {
            if(currentProductState.images[i].name == req.body.deletedImages[j]) {
                currentProductState.images.splice(i, 1)
                break
            }
        }
    }
    req.body['images'] = currentProductState.images

    // If there's a new image(s)
    if(req.files) {
        preprocessImage(req)
    }

    req.body.specifications = JSON.parse(req.body.specifications)

    try {
        const updatedProduct = await Product.findOneAndUpdate({_id: productID}, req.body, {new: true})
        if(!updatedProduct) {
            throw new Error('Fail to update product..')
        }
        console.log(updatedProduct)
        res.status(200).json(updatedProduct)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id

    try {
        const deletedProduct = await Product.findOneAndDelete({_id: id})
        if(!deletedProduct) {
            throw new Error('Fail to delete product..')
        }
        res.status(200).json('Delete success')
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

module.exports = router