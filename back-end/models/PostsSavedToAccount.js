const mongoose = require("mongoose")

const SavedToAccount = mongoose.Schema( {
    
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        immutable: true
    },

    post: {
        type: mongoose.Types.ObjectId,
        required: true,
        immutable: true
    },
    
    savedAt: {
        type: Date,
        required: false,
        default: Date.now
    }
} )

const Saved = mongoose.model("Saved", SavedToAccount)
module.exports = Saved