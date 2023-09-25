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
            singleBlog.socials = singleBlogAuthor.socials;
            
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



module.exports = router