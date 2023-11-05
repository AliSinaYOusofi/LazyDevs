const { formatDistanceToNow } = require("date-fns");
const Post = require("../models/Blogs");
const PostView = require("../models/PostViews");
const SignedUpUser = require("../models/Register");
const bcrypt = require("bcrypt");
const router = require("express").Router();


// get account credentials
router.get("/my_posts/:author", async (req, res) => {

    let {author} = req.params;

    if (!author) return res.status(200).json({message : "no author id provied"})

    author = String(author).split(":")[1];

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
        
        console.log(e, 'while fetching user based blogs, accountRoutes');
        
        return res.
            status(200).
            json({
                message: "execption happened",
                status: "failed"
        })
    }
})

router.post("/update_account", async (req, res) => {
    
    const {
        username,
        workEducation,
        password,
        confirmPassword,
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
        console.log(e)
        return res.
            status(200).
            json({
                message: "execption happened",
                status: "failed"
        })
    }
})
 
module.exports = router