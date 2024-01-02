const router = require("express").Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const SignedUpUser = require("../models/Register");
const Post = require("../models/Blogs");
const {validationResult, body} = require("express-validator");
const PostView = require("../models/PostViews");
const Likes = require("../models/postLikes");
const Comments = require("../models/Comments");
const CommentsReply = require("../models/ReplyComments");
const FollowingUser = require("../models/FollowingUsers");
const PostNotifications = require("../models/PostNotification");
const { postMessage } = require("../utils/notification_data");
const PostLikesNotification = require("../models/LikePostNotification");
const CommentNotification = require("../models/CommentsNotifications");
const ReplyCommentNotification = require("../models/ReplyCommentNotification");
const validateEmail = require("../utils/verifyEmailValidation");
const OTPModel = require("../models/OTP");
const nodemailer = require("nodemailer")

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

        // checking if we can send or receive emails to this account in case they provide invalid
        // emails (self made emails)        
        
        const {
            username,
            fullName,
            password,
            email,
            profileUrl
        } = req.body;

        const userInfo = { username, fullName, password, email, profileUrl };

        try {
            
            let emailVerificationValid = await fetch(`https://emailverification.whoisxmlapi.com/api/v3?apiKey=${process.env.EMAIL_VERIFICATION}&emailAddress=${email}`, 
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            
            emailVerificationValid = await emailVerificationValid.json()
            
            let isEmailValid = validateEmail(emailVerificationValid)

            if (! isEmailValid) return res.status(200).send("EmailInvalid");

            let newUserData = new SignedUpUser(userInfo);
             
            if (await SignedUpUser.usernameAlreadyExists(username)) return res.status(200).json("usernameExists");
            else if (await SignedUpUser.emailAlreadyExists(email)) return res.status(200).json("emailExists");
            
            newUserData.save(); // no longer accepts callback

            // sending confirmation otp for verifying if the user is the owner of the email
            // they calaim to be
            
            // gening otp
            const otp = Math.floor(100000 + Math.random() * 900000);

            const newOtp = new OTPModel({
                email,
                otp
            })

            // sending otp to the user
            let transporter = nodemailer.createTransport({
                
                host: "smtp-relay.brevo.com",
                port: 587,
                auth: {
                    user: process.env.OUTLOOK_ACC,
                    pass: process.env.OUTLOOK_ACC_PASS
                }
            });

            const mailOptions = {
                
                from: process.env.OUTLOOK_ACC,
                to: email,
                subject: "Confrim Your email",
                text: `Use this verfication code to confirm your email: ${otp}`
            }
            
            transporter.sendMail(mailOptions, (error, info) => {
                
                if (error) {
                    console.error("error while sending email", error)
                    return res.status(400).json({error: "Server error, try again later"})
                }
                
                else {
                    console.log("email sent successfully")
                    newOtp.save()
                    return res.status(200).send("confrim")
                }
            })
        }
        catch(error) {
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
                    
                    // if the user has signed up but has not yet confirmed his/her
                    // account. they must confirm their account first
                    if (! currentUserData.isAccountConfirmed) {
                        return res.
                        status(200).
                        send
                        (   
                            "unconfirmed"
                        )
                    }

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
    body('tagInputs').isArray(),
    async (req, res) => 
    {
        const result = validationResult(req)

        if (! result.isEmpty()) return res.status(200).json({message: "invalid data provided", error: result.array()})
        
        let {content, user_id, tagInputs} = req.body;
        
        if (!user_id) return res.status(200).json({message: "user_id required"});
        
        else if (! tagInputs || tagInputs.every(value => value === '')) {
            return res.status(200).json({
                status: "failed",
                reason: "empty tags all"
            })
        }
        //TODO: taginputs must have a hash before their name: done
        tagInputs = tagInputs.map(tag => `#${tag}`.toLowerCase())
        content = (JSON.parse(decodeURIComponent(content)))
        
        const randomIdForPost = crypto.randomBytes(16).toString("hex");
        
        let newPost = new Post({
            post_id: randomIdForPost,   
            author: user_id,
            title: content.split("\n")[0],
            body: content,
            comments: [],
            tags: tagInputs,
        });

        try {   
            await newPost.save();
            // before sending response a notification must be sent
            // to the users who are following this user

            const followersList = await FollowingUser.
                find({
                    user_id:{ $ne: user_id},
                    "follows.user": user_id
                }).
                lean().
                exec()
            
            // the receivers might be a bunch of users

            
            await Promise.all(
                
                followersList.map(
                
                    async (follower, index) => {
                
                        const followersData = await SignedUpUser.findById(user_id).lean().exec()

                            if ( followersData) {
                                const sendNotificationsToUser = new PostNotifications( {
                                    receivers: follower.user_id,
                                    sender: user_id,
                                    message: postMessage(followersData.username),
                                    post_id: newPost._id
                                } )

                                await sendNotificationsToUser.save()
                            }
                    }
                )
            )
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

router.delete("/delete_account", async (req, res) => {
    
    const user_id = req.user_id

    if (! user_id) return res.status(200).send("noUser")
    
    try {
        let user_exists = await SignedUpUser.findById(user_id)

        if (! user_exists) return res.status(200).send("noUser")
        
        await SignedUpUser.deleteOne({_id: user_id});
        // delete all posts of the user
        await Post.deleteMany({author: user_id})
        // clear cookies
        res.clearCookie("accessToken")
        res.clearCookie("refreshToken")
        // delete comments
        await Comments.deleteMany({"comment.author": user_id})
        // delete likes
        await Likes.deleteMany({liker: user_id})
        // delete post views
        await PostView.deleteMany({viewer: user_id})
        // delete reply comments
        await CommentsReply.deleteMany({author: user_id})
        // remove from those who are following this user
        await FollowingUser.updateMany(
            { "follows.user": user_id },
            { $pull: { "follows": user_id } }
        )
        // remove those who are followed by this user
        
        await FollowingUser.findOneAndDelete({user_id: user_id})
        
        await PostLikesNotification.deleteMany({sender: user_id})
        await CommentNotification.deleteMany({sender: user_id})
        await ReplyCommentNotification.deleteMany({sender: user_id})
        await PostNotifications.deleteMany({sender: user_id})
        
        return res.status(200).json({status: "success"});
    } catch (error) {
        console.error("Error deleting account", error);
        return res.status(200).json({status: "failed"});
    }
})
module.exports = router;