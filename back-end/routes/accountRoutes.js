const { formatDistanceToNow } = require("date-fns");
const Post = require("../models/Blogs");
const PostView = require("../models/PostViews");
const SignedUpUser = require("../models/Register");
const bcrypt = require("bcrypt");
const { body, validationResult, query } = require("express-validator");
const router = require("express").Router();

router.get(
    "/my_posts", 
    body('id').notEmpty().isMongoId().escape(),
    async (req, res) => 
    
    {

        let author = req.user_id;

        if (!author) return res.status(200).json({message : "no author id provied"})

        try {
            const Posts = await Post.find({author}).lean().exec()

            for (let post of Posts) {
                const views = await PostView.find({post_id: post._id}).lean().exec()
                post.viewCount = views.length
                post.commentCount = post.comments.length
                post.distance = formatDistanceToNow(post.createdAt, {addSuffix: true}).replace("about", "")
            }

            Posts.sort( (a, b) => b.viewCount - a.viewCount)

            return res.
                status(200).
                json({
                    message: "data fetched",
                    status: "success",
                    data: Posts
                })

        } catch(e) {
            
            console.error(e, 'while fetching user based blogs, accountRoutes');
            
            return res.
                status(200).
                json({
                    message: "execption happened",
                    status: "failed"
            })
        }
    }
)

router.post(
    "/update_account",
    body('username').notEmpty().escape().isAlpha().isString().optional(),
    body('workEducation').notEmpty().escape().isAlpha().isString().optional(),
    body('email').notEmpty().escape().trim().isEmail().optional(),
    body('password').notEmpty().isLength({min: 8, max: 50}).trim().escape().optional(),
    body('work').notEmpty().escape().optional(),
    body('id').notEmpty().isMongoId().escape().optional(),  
    async (req, res) => {
        
        const result = validationResult(req)

        if (! result.isEmpty()) return res.status(400).json({message: "invalid data provided"})
        
        const {
            username,
            workEducation,
            password,
            bio,
            work,
            profileUrl,
            id
        } = req.body
        
        try {
            
            const currentUserToBeUpdated  = await SignedUpUser.findById(id)
            const currentUserToBeUpdatedPlainObj = currentUserToBeUpdated.toObject()

            if (currentUserToBeUpdated) {
                if (username && username?.trim() !== '') {
                    currentUserToBeUpdatedPlainObj.username = username;
                }
            
                if (workEducation && workEducation?.trim() !== '') {
                    currentUserToBeUpdatedPlainObj.education = workEducation;
                }
                
                if ( bio && bio?.trim() !== '') {
                    currentUserToBeUpdatedPlainObj.bio = bio;
                }
            
                if ( work && work?.trim() !== '') {
                    currentUserToBeUpdatedPlainObj.work = work;
                }
            
                if ( profileUrl && profileUrl !== "https://cdn-icons-png.flaticon.com/512/4202/4202831.png") {
                    currentUserToBeUpdatedPlainObj.profileUrl = profileUrl;
                }
            
                if ( password && password?.trim() !== '') {
                    const saltRounds = await bcrypt.genSalt(10);
                    const hash = await bcrypt.hash(password, saltRounds);
                    currentUserToBeUpdatedPlainObj.password = hash;
                }
                
                await currentUserToBeUpdated.updateOne(currentUserToBeUpdatedPlainObj)
                delete currentUserToBeUpdatedPlainObj.password;
                return res.status(200).json({ message: "User information updated", status: "success", updatedData: currentUserToBeUpdatedPlainObj});
            }
            
            else {
                console.log("user not found error")
                return res.status(200).json({message : "user not found", status: "not found"})
            }
        }
        catch (e) {
            console.error(e)
            return res.
                status(200).
                json({
                    message: "execption happened",
                    status: "failed"
            })
        }
    }
)

router.get(
    
    "/user_posts", 
    query('user_id').notEmpty().isMongoId().escape(),
    async (req, res) => 
    
    {

        let result = validationResult(req)
        
        if (! result.isEmpty()) return res.status(200).json({message : "no author id provied"})
        let {user_id: author} = req.query;
        
        console.log("here")
        try {
            const Posts = await Post.find({author}).lean().exec()

            for (let post of Posts) {
                const views = await PostView.find({post_id: post._id}).lean().exec()
                post.viewCount = views.length
                post.commentCount = post.comments.length
                post.distance = formatDistanceToNow(post.createdAt, {addSuffix: true}).replace("about", "")
            }

            Posts.sort( (a, b) => b.viewCount - a.viewCount)

            return res.
                status(200).
                json({
                    message: "data fetched",
                    status: "success",
                    data: Posts
                })

        } catch(e) {
            
            console.error(e, 'while fetching user based blogs, accountRoutes');
            
            return res.
                status(200).
                json({
                    message: "execption happened",
                    status: "failed"
            })
        }
    }
)

router.post(
    "/update_tag",
    body('tagInputs').notEmpty().isArray(), 
    async (req, res) => 
    {
        let result = validationResult(req)
        
        if (! result.isEmpty()) return res.status(400).json({message : "no author id provied"})
        
        try {

            let {tagInputs} = req.body

            tagInputs = tagInputs.map(tag => tag.trim())
            tagInputs = tagInputs.filter(tag => tag !== '')
            
            const userId = req.user_id;
            const user = await SignedUpUser.findByIdAndUpdate(userId, {
                socials : tagInputs
            })

            await user.save()
            return res.status(200).json({message: "tags updated", status: "success"})
        } 
        catch(e) {
            console.error(e, 'while updating tags')
            return res.status(400).json({message: "tags update failed", status: "failed"})
        }
    }
)
 
module.exports = router