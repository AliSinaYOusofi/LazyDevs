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

    joined: {
        type: Date,
        required: false,
        default: () => new Date().toISOString()
    }
});

usersSignupSchema.pre("save", function(next) { // hash password middleware
    
    if (!this.isModified('password')) return next();
    
    bcrypt.genSalt(10, function(error, slatRounds) {
        
        if (error) return next(error);

        bcrypt.hash(this.password, slatRounds, function(error, hash) {
            if (error) return next(error);
            this.password = hash;
            next();
        });
    });
});

// checking for unique username and email
usersSignupSchema.static.emailAlreadyExists = async (email) => !! (await SignedUpUser.findOne({ email }));
usersSignupSchema.static.usernameAlreadyExists = async (username) => !! (await SignedUpUser.findOne({username}));

// static method
usersSignupSchema.static.authenticateUser = async (candidatePassword) => {
    let user = usersSignupSchema.static.emailAlreadyExists(this.email);
    if (!user) return "emailNotFound";
    let isUserAuthenticate = await bcrypt.compare(candidatePassword, user.password);
    return isUserAuthenticate ? user : "wrongPassword";
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