const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// For Registration Users

const usersSignupSchema = new mongoose.Schema( {
    
    username: {
        type: String,
        required: true,
        unique: true, // should be checked on every signup
        trim: true,
        minLength: 3,
        maxLength: 20
    },

    fullName: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 20
    },

    email: {
        type: String, // i found the bug. not adding type will get the schema type error.
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
    },

    bio: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 200,
        requried: false,
        default: null,
        validate: {
            validator: value => String(value).length >= 1,
            message: props => `${props} should be more than 1(length)`
        },
    },

    education : {
        type: String,
        maxLength: 30,
        requried: false,
        default: null
    },

    work: {
        type: String,
        maxLength: 30,
        requried: false,
        default: null
    },

    socials: {
        type: Array,
        required: false,
    },

    personalWebsite: {
        type: String,
        maxLength: 30,
        requried: false,
        default: null
    },

    joined: {
        type: Date,
        required: false,
        default: () => new Date().toISOString()
    }
});

usersSignupSchema.pre("save", function(next) { // hash password middleware
    
    let user = this;
    if (!this.isModified('password')) return next();
    
    bcrypt.genSalt(10, function(error, saltRounds) {
        
        if (error) return next(error);

        // the bug that i got here was becuase
        // this keyword can have different context inside nested functions.
        // becuase the this keyword did not refer to the document being saved.
        // instead saving it to user variable fixed the bug.

        bcrypt.hash(user.password, saltRounds, function(error, hash) {
            if (error) return next(error);
            user.password = hash;
            next();
        });
    });
});

// checking for unique username and email
// this is statics not static
usersSignupSchema.statics.emailAlreadyExists = async (email) => !! (await SignedUpUser.findOne({ email }));
usersSignupSchema.statics.usernameAlreadyExists = async (username) => !! (await SignedUpUser.findOne({username}));

// static method
usersSignupSchema.statics.authenticateUser = async (candidatePassword, email) => {

    let user = await SignedUpUser.findOne({'email': email});
    
    if (!user) return false;  
  
    let isUserAuthentic = await bcrypt.compare(candidatePassword, user.password);
    user = user.toObject();
    delete user.password;
    return isUserAuthentic ? user : false;
}

// return current user as json
usersSignupSchema.methods.userToJson = () => {
    let currentUser = this;
    const currentUserObject = currentUser.toObject();
    delete currentUserObject.password;
    return currentUserObject;
}

const SignedUpUser = mongoose.model("SignedUpUsers", usersSignupSchema);

module.exports = SignedUpUser;