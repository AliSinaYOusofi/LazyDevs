const mongoose = require("mongoose")

const ReplyComment = mongoose.Schema({

    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"SignedUpUsers",
        required: true,
    },

    sender: {
        type: mongoose.Types.ObjectId,
        ref: "SignedUpUser"
    },

    comment_id : {
        type: mongoose.Types.ObjectId,
        ref: "Comments"
    },

    message: {
        type: String,
        required: true
    },

    notifiedAt: {
        type: Date,
        default: Date.now,
    }
})