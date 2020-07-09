const router = require('express').Router()
const checkToken = require('./checkToken')
const Post = require('../models/post')

router.get('/', async (req, res) => {
    try {
        const allPost = await Post.find().populate('userId', 'name email date _id')
        res.setHeader('Content-Type', 'application/json');
        res.send(allPost)
    }
    catch (erorr) {
        res.status(400).send({ message: error });

    }
})

router.get('/:id', checkToken, async (req, res) => {
    id = req.params.id
    try {
        const Post_id = await Post.findById(id).populate('userId', 'name email date _id')
        res.send(Post_id);
    }
    catch (error) {
        res.status(400).send({ message: error })
    }

})

router.post('/add', checkToken, async (req, res) => {

    const post = new Post({
        title: req.body.title,
        imgUrl: req.body.imgUrl,
        description: req.body.description,
        startsDate: req.body.startsDate,
        location: req.body.location,
        userId: req.user
    })

    try {
        const data = await post.save()
        res.send(data)
    } catch (error) {
        res.status(400).send({ message: error })
    }

})

router.delete('/delete/:id', checkToken, async (req, res) => {
    const delid = req.params.id

    try {
        const data = await Post.findById(delid)
        if (data.userId == req.user) {
            const datapost = await Post.findByIdAndDelete(delid)
            res.send(datapost)
        }
        else {
            res.status(400).send({ message: 'Dont Your Post' })
        }
    }
    catch (erorr) {
        res.status(400).send({ message: erorr })

    }

})

router.post('/user/:userId', checkToken, async (req, res) => {
    const userId = req.params.userId
    try {
        const data = await Post.find({ userId: userId }).populate('userId', 'name email date _id')
        res.send(data)
    } catch (error) {
        res.status(400).send({ message: error })
    }
})

router.get('/profile', checkToken, async (req, res) => {
    console.log(req.user)
    try {
        const data = await Post.find({ userId: req.user }).populate('userId', 'name email date _id')
        res.send(data)
    } catch (error) {
        res.status(400).send({ message: error })
    }
})

module.exports = router