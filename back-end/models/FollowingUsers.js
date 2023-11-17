const mongoose = require("mongoose");

const FollowingUserSchema = new mongoose.Schema( {
    
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SignedUpUser",
        required: true,
        immutable: true
    },

    follows: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "SignedUpUser",
                required: true
            },
            followedAt: {
                type: Date,
                default: Date.now,
                required: true
            }
        }
    ]

} );

const FollowingUser = mongoose.model("FollowingUser", FollowingUserSchema);

module.exports = FollowingUser