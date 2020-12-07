const { Router } = require('express')
const Post = require('../../models/Post')

const router = Router()

router.get('/', async (req, res) => {

})

router.post('/', async (req, res) => {
    const newPost = new Post(req.body)

    try {
        const post = await newPost.save()

        if(!post) {
            throw new Error('Save post failed..')
        }

        await post.populate('poster').execPopulate()
        
        res.status(200).json(post)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.get('/reviews/:id', async (req, res) => {
    const id = req.params.id

    try {
        const posts = await Post.find({
            product: id,
            type: 'review'
        }).sort({posted_date: -1})

        if(!posts) {
            throw new Error('Fail to find reviews..')
        }

        for(let i=0; i<posts.length; i++) {
            await posts[i].populate('poster').execPopulate()
        }
        
        res.status(200).json(posts)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.get('/reviews/seller/:seller_id', async (req, res) => {
    const seller = req.params.seller_id

    try {
        let posts = await Post.find({
            type: 'review',
        }).populate('product')
        
        if(!posts) {
            throw new Error('Fail to find reviews..')
        }

        posts = posts.filter(post => post.product.seller == seller)

        res.status(200).json(posts)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.get('/discussions/:id', async (req, res) => {
    const id = req.params.id

    try {
        const posts = await Post.find({
            product: id,
            type: 'discussion'
        }).sort({posted_date: -1})

        if(!posts) {
            throw new Error('Fail to find discussions..')
        }
        
        for(let i=0; i<posts.length; i++) {
            await posts[i].populate('poster').execPopulate()
            await posts[i].populate('replies').execPopulate()

            for(let j=0; j<posts[i].replies.length; j++) {
                await posts[i].replies[j].populate('poster').execPopulate()
            }
        }

        res.status(200).json(posts)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.post('/discussions/:id/reply', async (req, res) => {
    const id = req.params.id
    
    try {
        const post = await Post.findOneAndUpdate(
            {
                _id: id
            },
            {
                $push: {
                    replies: req.body._id
                }
            },
            {
                new: true
            }
        )
        if(!post) {
            throw new Error('Post reply failed..')
        }
        
        res.status(200).json(post)
    } catch(err) {
        console.log(err.message)
        res.status(500).json({message: err.message})
    }
})

module.exports = router