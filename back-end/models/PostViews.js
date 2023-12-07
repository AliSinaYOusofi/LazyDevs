const mongoose = require("mongoose");

const PostViewsSchema = new mongoose.Schema( {
    
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
        immutable: true
    },
    
    viewCount: {
        type: Number,
        required: true,
        immutable: false,
        min: 0
    },

    viewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SignedUpUser",
        required: true,
    },

    viewdAt: {
        type: Date,
        default: Date.now,
        required: false
    }

} );

const PostView = mongoose.model("PostViews", PostViewsSchema);

module.exports = PostView