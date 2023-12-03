const mongoose = require("mongoose")

const PostNoti = mongoose.Schema( {
    
    receivers: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SignedUpUser"
        }
    ,

    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SignedUpUser"
    },

    message: {
        type: String,
        required: true
    },

    post_id: {
        type: String,
        required: true
    },

    isRead: {
        type: Boolean,
        default: false
    },

    At: {
        type: Date,
        default: Date.now
    }
} )

const PostNotifications = new mongoose.model("PostNotifications", PostNoti)

module.exports = PostNotifications