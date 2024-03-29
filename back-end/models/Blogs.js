const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    
    post_id: {
        type: String,
        required: true,
        validate: {
            validator: (id) => id.length > 15, // 15
            message: "post_id length should be greater than 15"
        },
        immutable: true
    },

    title: {
        type: String,
        required: true,
        validate: {
            validator: (title) => title.length > 1, // 64
            message: "post title length should be greater than 1"
        },
    },
    
    body: {
        type: String,
        required: true,
        validate: {
            validator: (body) => body.length > 3, // 64
            message: "body should at least be 3 chars"
        },
    },

    author: { // the email of the user who posted. EMAIL EMAIL EMAIL
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SignedUpUser',
        required: true,
    },
    
    comments: [{ // the email of the user who posted. EMAIL EMAIL EMAIL
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        required: true,
    }],

    createdAt: {
        type: Date,
        default: Date.now,
        required: false
    },

    updatedAt: {
        type: Date,
        default: new Date().toISOString(),
        required: false,
        immutable: false
    },

    tags: {
        type: Array,
        required: true,
        immutable: false,
    }

});

PostSchema.index({body: "text"})
// Middleware to update the updatedAt field when a post is modified
PostSchema.pre('findOneAndUpdate', function (next) {
    this.update({}, { $set: { updatedAt: new Date() } });
    next();
});

// Middleware to delete all comments associated with a post when it is deleted
PostSchema.pre('remove', function (next) {
    mongoose.model('Comment').deleteMany({ post_id: this._id }, next);
});

// indexing authors and comments
const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
