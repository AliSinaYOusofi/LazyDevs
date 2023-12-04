const mongoose = require("mongoose");

const CommentNotificationSchema = mongoose.Schema({
    
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
    comment_id : {
        type: mongoose.Types.ObjectId,
        ref: "Comments",
        required: true
    },
    isRead: {
        type: Boolean,
        default: false,
    }
});

const CommentNotification = mongoose.model("CommentNotification", CommentNotificationSchema);

module.exports = CommentNotification;
