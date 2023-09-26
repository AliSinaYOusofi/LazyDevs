const mongoose = require('mongoose');

const postLikes = new mongoose.Schema({
    post_id: {
        type: "String",
        required: true,
        immutable: true
    },

    likes: {
        type: Number,
        required: false,
        immutable: false
    },

    liker: {
        type: "String",
        required: true,
        immutable: false
    }
});

const Likes = mongoose.model('Likes', postLikes);
module.exports = Likes;