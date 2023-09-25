const router = require("express").Router();

const jwt = require("jsonwebtoken");

const crypto = require("crypto");
const Post = require("../models/Blogs");
const SignedUpUser = require("../models/Register");

// const { getDB } = require("../db_connection/mongoose.db.config");



router.get("/newsfeed", async (req, res) => {
    
    

    try {
        const blogs = await Post.find().lean().exec();
    
        const authorIds = blogs.map(blog => blog.author);
        const authorDataPromises = authorIds.map(authorId => SignedUpUser.findById(authorId).lean().exec());
        const authorData = await Promise.all(authorDataPromises);
    
        const completeBlogData = blogs.map((blog, index) => {
            blog.profileUrl = authorData[index].profileUrl;
            blog.username = authorData[index].username;
            return blog;
        });
    
        console.log(completeBlogData);
        return res.status(200).json({
            status: "success",
            data: completeBlogData
        });
  
    } catch (e) {
        console.log(e, "fetching blogs");
        res.status(400).json({
            status: "failed"
        });
    }
});

router.post("/single_post/:post_id", async (req, res) => {
    
    let { post_id } = req.params;
    post_id = String(post_id).split(":")[1];
    
    console.log(post_id, "post -id of the blog");

    if (post_id) {
        
        try {

            let singleBlog = await Post.findById(post_id).lean().exec();
            console.log(singleBlog, "single blog");

            let singleBlogAuthor = await SignedUpUser.findById(singleBlog.author).lean().exec();
            singleBlog.profileUrl = singleBlogAuthor.profileUrl;
            singleBlog.username = singleBlogAuthor.username;
            singleBlog.joined = singleBlogAuthor.joined;
            singleBlog.email = singleBlogAuthor.email;
            
            return res.status(200).json({
                status: "success",
                data: singleBlog
            })
        } 
        
        catch (e ) {
            console.log(e, "fetching single blog");
            return res.status(200).json({message: "failed"})
        }
    }
    return res.status(200).json({message: "blog not found"})
});


router.post("/comment", async (req, res) => {
    
    let { post_id, comment, author} = req.body;

    console.log(post_id, comment, author);

    if (post_id) {
        
        try {

            let singleBlog = await Post.findById(post_id);

            if (! singleBlog) {
                return res.status(200).json({
                    status: "failed",
                    data: "blog not found"
                })
            }
            
            const newComment = {
                post: post_id,
                comment: {
                    author: author,
                    body: comment,
                }
            }

            singleBlog.comments.push(newComment);

            await singleBlog.save();

            return res.status(200).json({
                status: "success",
                data: "saved"
            })
        } 
        
        catch (e ) {
            console.log(e, "saving comment");
            return res.status(200).json({status: "failed", data: "server error"})
        }
    }
    return res.status(200).json({status: "failed", data: "post_id not provided"})
});



module.exports = router