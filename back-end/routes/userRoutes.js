const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { getDB } = require("../db_connection/mongoose.db.config");
const SignedUpUser = require("../models/Register");
require("dotenv").config();

router.post("/save_user", async (req, res) => {
    
    // this route is working just fine for now.
    const {
        username,
        fullName,
        password,
        email,
        profileUrl
    } = req.body;

    const userInfo = { username, fullName, password, email, profileUrl };

    const db = await getDB();

    try {
        
        let newUserData = new SignedUpUser(userInfo);
        
        if (await SignedUpUser.usernameAlreadyExists(username)) return res.status(200).json("usernameExists");
        else if (await SignedUpUser.emailAlreadyExists(email)) return res.status(200).json("emailExists");
         
        newUserData.save(); // no longer accepts callback
        return res.status(200).send("UserSaved");

    }catch(error) {
        console.log(error, "error while saving data");
        return res.status(500).send("serverError");
    }
});

router.post("/check_user_login", async (req, res) => {
    
    const {email, password} = req.body;
    
    let db = await getDB();

    try {
        
        let isUserRegistered = await SignedUpUser.emailAlreadyExists(email);

        if (isUserRegistered ) {
            let currentUserData = await SignedUpUser.authenticateUser(password, email);
            if (currentUserData) {

                const accessToken = jwt.sign(currentUserData, process.env.JWT_SECRET, {expiresIn: "15m"});
                const refreshToken = jwt.sign(currentUserData, process.env.JWT_SECRET, {expiresIn: "7d"});
                
                res.cookie('accessToken', accessToken, {maxAge: 900000, sameSite: "Lax"});
                res.cookie('refreshToken', refreshToken, {maxAge: 604800000,  sameSite: "Lax"});

                return res.status(200).send(currentUserData);
            }
        }
        return res.status(200).send("Invalid");
 
    } catch (error) {
        console.log("Error Login route", error);
        return res.status(200).send("Server Error");
    }
})

module.exports = router; // to special object