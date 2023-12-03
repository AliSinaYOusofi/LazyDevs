const mongoose = require("mongoose")

const Notification = mongoose.Schema({

    receivers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SignedUpUser"
        }
    ],
    
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SignedUpUser",
        required: true
    },

    message : {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    isRead: {
        type: Boolean,
        default : false
    }

})

const Notifications = new mongoose.model("Notifications", Notification)

module.exports = Notifications