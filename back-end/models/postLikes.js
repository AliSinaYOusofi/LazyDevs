const mongoose = require('mongoose');

const postLikes = new mongoose.Schema({
    
    post_id: {
        type: "String",
        required: true,
        immutable: true
    },

    likes: {
        type: Number,
        required: true,
        default: 0,
        immutable: false,
    },

    liker: {
        type: mongoose.Types.ObjectId,
        ref: "SignedUpUser",
        required: true,
        immutable: false
    },

    likedAt: {
        type: Date,
        default: Date.now,
        required: false,
    }
});

const PostLikes = mongoose.model('Likes', postLikes);
module.exports = PostLikes;