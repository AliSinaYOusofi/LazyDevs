const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
    
    text: { 
        type: String, 
        required: true,
        immutable: false
    },

    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'SignedUpUser', 
        required: false 
    },

    comment: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Comments', 
        required: false 
    },
    
    createdAt: {
        type: Date,
        default: Date.now,
        required: false
    },

    updatedAt: {
        type: Date,
        default: Date.now,
        required: false,
        immutable: false
    },

}, { timestamps: true });


const CommentsReply = new mongoose.model("commentsReply", replySchema);
module.exports = CommentsReply;