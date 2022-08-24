const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    created: {
        type: Number
    }
})

module.exports = mongoose.model('post', postSchema)