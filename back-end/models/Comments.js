const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },

    comment: [
        {
            author: {
                type: String,
                required: true,
                immutable: true
            },
            commentedOn: {
                type: Date,
                default: Date.now,
            },
            
            body: {
                type: String,
                required: true,
                minLength: 1,
                immutable: false,
            }
        }
    ],
    replies: [ { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'commentsReply',
        required: false
    }],
});

const Comments = mongoose.model('Comment', CommentSchema);
module.exports = Comments;