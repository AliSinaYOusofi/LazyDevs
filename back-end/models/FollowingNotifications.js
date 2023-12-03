const mongoose = require("mongoose")

const Following = mongoose.Schema( {
    
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"SignedUpUsers",
        required: true,
    },

    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"SignedUpUsers",
        required: true,
    },

    At: {
        type: Date,
        default: Date.now,
    },

    message : {
        type: String,
        required: true
    },

    isRead: {
        type: Boolean,
        default: false,
    }
} )

const FollowingNotification = new mongoose.model("FollowingNotification", Following)
module.exports = FollowingNotification