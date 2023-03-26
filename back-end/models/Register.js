const mongoose = require("mongoose");

// For Registration Users

const usersSignupSchema = new mongoose.Schema( {
    
    username: {
        type: String,
        required: true,
        unique: true, // should be checked on every signup
        trim: true,
        minLegth: 3,
        maxLength: 20
    },

    fullName: {
        type: String,
        required: true,
        trim: true,
        minLegth: 3,
        maxLength: 20
    },

    email: {
        required: true,
        unique: true, // should be checked on every signup
        trim: true,
        lowercase: true,
        validate: {
            validator: function(e) {
                return new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}').test(e.toLowerCase())
            },
            message: "Invalid email provided"
        }
    },

    password: {
        type: String,
        required: true,
        minlength: 8
    },

    profileUrl: {
        type: String,
        validate: {
            validator: function(u) {
                return new RegExp("^https?:\/\/.+$").test(u);
            },
            message: "invalid profile url"
        }
    }
});

const SignupUser = mongoose.model("SignedUpUsers", usersSignupSchema);

module.exports = SignupUser;