const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true
    },
    
    body: {
        type: String,
        required: true
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SignedUpUsers',
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware to update the updatedAt field when a post is modified
PostSchema.pre('findOneAndUpdate', function (next) {
    this.update({}, { $set: { updatedAt: new Date() } });
    next();
});

// Middleware to delete all comments associated with a post when it is deleted
PostSchema.pre('remove', function (next) {
    mongoose.model('Comment').deleteMany({ post: this._id }, next);
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
