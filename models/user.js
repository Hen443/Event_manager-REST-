const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        max: 200,
        min: 3,
        required: true
    },
    email: {
        type: String,
        max: 100,
        min: 4,
        required: true
    },
    password: {
        type: String,
        max: 200,
        min: 6,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('User', userSchema)