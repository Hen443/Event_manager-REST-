const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        max: 200,
        min: 5,
        required: true
    },
    imgUrl: {
        type: String,
        max: 800,
        min: 4,
        required: true
    },
    description: {
        type: String,
        max: 5000,
        min: 5,
        required: true
    },
    addingDate: {
        type: Date,
        default: Date.now()
    },
    startsDate: {
        type: Date,
        require: true
    },
    location: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

})

module.exports = mongoose.model('Post', postSchema)