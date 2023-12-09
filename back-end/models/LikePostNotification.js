const mongoose = require("mongoose")

const PostLikeNoti = mongoose.Schema({
    
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SignedUpUser"
    },
    
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SignedUpUser',
        required: true
    },

    message: {
        type: String,
        required: true
    },

    At: {
        type: Date,
        default: Date.now,
    },

    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    
    isRead: {
        type: Boolean,
        default: false,
    }
});

const PostLikesNotification = mongoose.model("PostLikesNotification", PostLikeNoti);

module.exports = PostLikesNotification;
