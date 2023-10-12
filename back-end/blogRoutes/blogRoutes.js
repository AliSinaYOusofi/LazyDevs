const router = require("express").Router();

const Post = require("../models/Blogs");
const SignedUpUser = require("../models/Register");
const Comment = require("../models/Comments");
const Likes = require("../models/postLikes");
const PostView = require("../models/PostViews");

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
            blog.viewCount = 0
            return blog;
        });

        for (const blog of completeBlogData) {
            const views = await PostView.find({post_id: blog._id}).lean().exec();
            console.log(views)
            blog.viewCount = views.length
        }

        completeBlogData.sort( (a, b) => b.viewCount - a.viewCount);
    
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

    if (post_id) {
        
        try {

            let singleBlog = await Post.findById(post_id).lean().exec();

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


    if (post_id) {
        
        try {

            let singleBlog = await Post.findById(post_id);

            if (! singleBlog) {
                return res.status(200).json({
                    status: "failed",
                    data: "blog not found"
                })
            }
            
            const newComment = new Comment(
                {
                    post: post_id.toString(),
                    comment: [ {
                        author: author,
                        body: comment,
                    } ]
                }
            );

            await newComment.save();



            singleBlog.comments.push(newComment._id);

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

router.post("/get_post_comments", async (req, res) => {
    
    const {post_id} = req.body;

    
    if (post_id) {

        try {

            let comments = await Comment.find({post: post_id}).lean().exec();
            
            comments = comments.map(async comms => {
                
                comms.comment = await Promise.all(comms.comment.map(async comment => {
                
                    const whoCommented = await SignedUpUser.findOne({ email: comment.author }).lean().exec();
                    
                    if (whoCommented) {
                    
                        comment.profileUrl = whoCommented?.profileUrl;
                        comment.username = whoCommented?.username;
                    }
                    
                    return comment;
                }));
                
                return comms;
            });
              
              // Wait for all the mapping operations to complete
            comments = await Promise.all(comments);

            

            return res.status(200).json({
                status: "success",
                data: comments
            })
        } 
        
        catch(e) {

            return res.status(200).json({
                status: "failed",
                data: "server error"
            })
        }
        
    }
    return res.status(200).json({
        status: "failed",
        data: "blog not found"
    })
});


router.post("/like_post", async (req, res) => {

    const {status, post_id, userEmail} = req.body;

    const post_id_exists = await Post.findById(post_id).lean().exec();

    if (! post_id_exists) return res.status(200).json({ status: "failed", data: "post not found" })

    if (status === "liked") {
        
        let user_email = await Likes.findOne({'liker': userEmail}).lean().exec();
        
        if (user_email) { 
            
            if (user_email.likes === 0) {
                /// adding one to the like
                await Likes.findOneAndUpdate({'liker': userEmail}, {$inc: {likes: 1}})

                return res.status(200).json({status: "success", data: "added one like"})
            }
            // subtracting one
            await Likes.findOneAndUpdate({'liker': userEmail}, {$inc: {likes: -1}})

            return res.status(200).json({status: "success", data: "subtracted one like"})
        } 
        
        else {
            // new user liked should be added
            const newLiker = new Likes({
                post_id,
                likes: 1,
                liker: userEmail
            }) 

            await newLiker.save();
            return res.status(200).json({status: "success", data: "new user liked"})
        }
    } 
    else if (status === "disliked") {
        
        await Likes.findOneAndUpdate({'liker': userEmail}, {$inc: {likes: -1}})
        return res.status(200).json({status: "success", data: "disliked and subtracted one"})
    }
});


router.get("/get_likes_comments_count/:post_id", async (req, res) => {
    
    let {post_id} = req.params;     
    post_id = String(post_id).split(":")[1];

    if (post_id) {

        let post_likes = await Likes.findOne({'post_id': post_id}).lean().exec();
        let commentCount = await Comment.find({'post': post_id}).lean().exec();
           
        if (post_likes) {
            return res.status(200).json({status: "success", likeCount: post_likes, commentCount})
        }
    }
    return res.status(200).json({status: "failed", data: "post not found"})

});

router.post("/save_new_visitor", async (req, res) => {
    
    let { post_id, user_id } = req.body; 
    
    if (post_id) {

        try {
            const userAlreadyViewed = await PostView.findOne({ post_id, viewer: user_id }).lean().exec();

            if (userAlreadyViewed) {
                return res.status(200).json({ status: "success", data: "user already viewed" });
            } 

            else {
                const newViewer = new PostView({ post_id, viewer: user_id, viewCount: 1 }); // Save the new view
                await newViewer.save();
                return res.status(200).json({ status: "success", data: "new user viewed" });
            }
        } 
        
        catch (e) {
            console.error("Failed when saving view:", e);
            return res.status(200).json({ status: "failed", data: "server error" });
        }
    }

    return res.status(200).json({ status: "failed", data: "post not found" });
})

module.exports = router