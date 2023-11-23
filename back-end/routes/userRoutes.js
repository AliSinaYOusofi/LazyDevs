const router = require("express").Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
// const { getDB } = require("../db_connection/mongoose.db.config");
const SignedUpUser = require("../models/Register");
const Post = require("../models/Blogs");
const {validationResult, body} = require("express-validator")
require("dotenv").config();

router.post(
    "/save_user",
    body('username').notEmpty().escape().isAlpha().isString(),
    body('fullName').notEmpty().escape().isAlpha().isString(),
    body('email').notEmpty().escape().trim().isEmail(),
    body('password').notEmpty().isLength({min: 8, max: 50}).trim(), 
    async (req, res) => 
    {
        // this route is working just fine for now.
        const result = validationResult(req)

        if (! result.isEmpty()) return res.status(200).json({message: "invalid data provided"})

        const {
            username,
            fullName,
            password,
            email,
            profileUrl
        } = req.body;

        const userInfo = { username, fullName, password, email, profileUrl };

        // const db = await getDB();

        try {
            
            let newUserData = new SignedUpUser(userInfo);
            
            if (await SignedUpUser.usernameAlreadyExists(username)) return res.status(200).json("usernameExists");
            else if (await SignedUpUser.emailAlreadyExists(email)) return res.status(200).json("emailExists");
            
            newUserData.save(); // no longer accepts callback
            return res.status(200).send("UserSaved");

        }catch(error) {
            console.error(error, "error while saving data");
            return res.status(500).send("serverError");
        }
    }
);

router.post(
    "/check_user_login", 
    body('email').notEmpty().escape().trim().isEmail(),
    body('password').notEmpty().escape().trim().isLength({min: 8, max: 50}),
    async (req, res) => 
    
    {
        const result = validationResult(req)

        if (! result.isEmpty()) return res.status(200).json({message: "invalid credentials"})
        
        const {email, password} = req.body;

        try {
            
            let isUserRegistered = await SignedUpUser.emailAlreadyExists(email);

            if (isUserRegistered ) {
                
                let currentUserData = await SignedUpUser.authenticateUser(password, email);
                
                if (currentUserData) {

                    const accessToken = jwt.sign(currentUserData, process.env.JWT_SECRET, {expiresIn: "1d"});
                    const refreshToken = jwt.sign(currentUserData, process.env.JWT_SECRET, {expiresIn: "2d"});
                    
                    res.cookie('accessToken', accessToken, 
                        {
                            maxAge: 86400000, 
                            sameSite: "Lax"
                        }
                    );
                    
                    res.cookie('refreshToken', refreshToken, 
                        {
                            maxAge: 604800000,  
                            sameSite: "Lax"
                        }
                    );

                    return res.status(200).send(currentUserData);
                }
            }
            return res.status(200).send("Invalid");
    
        } catch (error) {
            console.error("Error Login route", error);
            return res.status(200).send("Server Error");
        }
    }
);

router.post(
    "/save_post",
    body('user_id').trim().isMongoId().escape(),
    body('content').notEmpty().escape(), 
    async (req, res) => 
    {
        const result = validationResult(req)
        console.log(result.array())
        if (! result.isEmpty()) return res.status(200).json({message: "invalid data provided"})

        const {content, user_id} = req.body;
        console.log(content, user_id)
        const randomIdForPost = crypto.randomBytes(16).toString("hex");   
        
        if (!user_id) return res.status(200).json({message: "user_id required"});
        
        let newPost = new Post({
            post_id: randomIdForPost,   
            author: user_id,
            title: content.split("\n")[0],
            body: content,
            comments: [],
        });

        try {   
            await newPost.save();
            return res.status(200).json({message: "success"}); 
        }         
        catch(error) {
            console.error("Error saving post", error);
            return res.status(200).json({message: "serverError"});
        }        
    }
)

router.get(
    "/check", 
    async (req, res) => 
    {
        return res.status(200).send("dummmy")
    }
)
module.exports = router; // to special object