const router = require("express").Router()
const Post = require("../models/Blogs")
const SignedUpUser = require("../models/Register")
const Comment = require("../models/Comments")
const Likes = require("../models/postLikes")
const PostView = require("../models/PostViews")
const { formatDistanceToNow, formatDistanceToNowStrict, differenceInDays } = require("date-fns");
const Comments = require("../models/Comments")
const { default: mongoose } = require("mongoose")
const replyComments = require("../models/ReplyComments")

router.get("/newsfeed", async (req, res) => {
      
    try {
        const blogs = await Post.find().lean().exec();
    
        const authorIds = blogs.map(blog => blog.author);
        const authorDataPromises = authorIds.map(authorId => SignedUpUser.findById(authorId).lean().exec());
        const authorData = await Promise.all(authorDataPromises);
    
        const completeBlogData = blogs.map((blog, index) => {
            blog.profileUrl = authorData[index].profileUrl
            blog.username = authorData[index].username
            blog.viewCount = 0
            blog.distance = formatDistanceToNowStrict((blog.createdAt), {addSuffix: true}).replace("about", "")
            return blog;
        });

        for (const blog of completeBlogData) {
            const views = await PostView.find({post_id: blog._id}).lean().exec()    
            blog.viewCount = views.length
        }

        completeBlogData.sort( (a, b) => b.viewCount - a.viewCount);
    
        return res.status(200).json({
            status: "success",
            data: completeBlogData
        });
  
    } catch (e) {  
        console.log(e, "fetching blogs");
        res.status(200).json({
            status: "failed"
        });  
    }     
});


router.get("/recent/:post_id", async (req, res) => {
     
    // get thre recent posts only
    // steps: get the latest post date and from that filter the posts that are posted like a week a ago or 2 weeks ago
    // or something

    let {post_id} = req.params
    post_id = post_id?.split(":")[1]

    try {
        const blogs = await Post.find().lean().exec();
    
        const authorIds = blogs.map(blog => blog.author);
        const authorDataPromises = authorIds.map(authorId => SignedUpUser.findById(authorId).lean().exec());
        const authorData = await Promise.all(authorDataPromises);
    
        const completeBlogData = blogs.map((blog, index) => {
            blog.profileUrl = authorData[index].profileUrl;
            blog.username = authorData[index].username;
            blog.viewCount = 0
            blog.commentCount = 0
            blog.distance = formatDistanceToNowStrict((blog.createdAt), {addSuffix: true}).replace("about", "")
            return blog;
        });

        for (const blog of completeBlogData) {
            const views = await PostView.find({post_id: blog._id}).lean().exec()
            blog.viewCount = views.length
            blog.commentCount = blog.comments.length
        }

        let latestBlogPostedThreshold = completeBlogData.reduce( (latest, blog) => {
            if (!latest || blog.createdAt > latest.createdAt) return blog
            return latest
        }, null)
        
        latestBlogPostedThreshold = latestBlogPostedThreshold.createdAt

        let latestBlogs15DaysAfterLatestBlog = completeBlogData.filter( blog => {
            
            const blogDate = new Date(blog.createdAt)
            return differenceInDays(blogDate, latestBlogPostedThreshold) <= 15
        })

        latestBlogs15DaysAfterLatestBlog = latestBlogs15DaysAfterLatestBlog.filter(blog => blog._id != post_id)
        
        return res.status(200).json({
            status: "success",
            data: latestBlogs15DaysAfterLatestBlog.reverse()
        });
    } catch (e) {  
        console.log(e, "fetching blogs");
        res.status(200).json({
            status: "failed"
        });  
    }     
});


router.get("/top", async (req, res) => {
     
    /* this gets the most viewed blog first
    // then we set the threshold
    // and filter based on that threshold */
    try {
        const blogs = await Post.find().lean().exec();
    
        const authorIds = blogs.map(blog => blog.author);
        const authorDataPromises = authorIds.map(authorId => SignedUpUser.findById(authorId).lean().exec());
        const authorData = await Promise.all(authorDataPromises);
    
        const completeBlogData = blogs.map((blog, index) => {
            blog.profileUrl = authorData[index].profileUrl;
            blog.username = authorData[index].username;
            blog.distance = formatDistanceToNow(blog.createdAt, {addSuffix: true}).replace("about", "")
            blog.viewCount = 0
            return blog;
        });

        for (const blog of completeBlogData) {
            const views = await PostView.find({post_id: blog._id}).lean().exec()    
            blog.viewCount = views.length
        }

        const mostViewdBlogs = completeBlogData.reduce( (pre, curr) => pre.viewCount > curr.viewCount ? pre : curr)
        const viewCountThreshold = mostViewdBlogs.viewCount - 2

        let filterBlogsBasedOnMostViewBlogs = completeBlogData.filter( a => a.viewCount >= viewCountThreshold)
        filterBlogsBasedOnMostViewBlogs.sort( (a, b) => b.viewCount - a.viewCount);
    
        return res.status(200).json({
            status: "success",
            data: filterBlogsBasedOnMostViewBlogs
        });
  
    } catch (e) {  
        console.log(e, "fetching top blogs");
        res.status(200).json({
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
            singleBlog.distance = formatDistanceToNow(singleBlog.createdAt, {addSuffix: true}).replace("about", "")

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

                    comment.distance = formatDistanceToNow(comment.commentedOn, {addSuffix: true}).replace("about", "")
                    
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
        data: "blogNotFound"
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

        let post_likes = await PostView.find({'post_id': post_id}).lean().exec();
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


// the following is for deleting blogs:

router.delete("/delete_post/:post_id", async (req, res) => {
    
    let {post_id} = req.params
    post_id = post_id.split(":")[1]

    try {
        const blogExists = await Post.findById(post_id).lean().exec()

        if (blogExists) {

            await Post.findByIdAndRemove(post_id)

            return res.status(200).json({
                status: "success",
            })

        } else {
            return res.status(200).json({
                status: "failed",
                reason: "post not found"
            })
        }
    } catch (e) {
        console.log("exception happened while deleting a post => () ", e)
        return res.status(200).json({
            status: "failed",
            reason: "server"
        })
    }
})

router.post("/save_comment_reply", async (req, res) => {
    
    let {post_id, reply, comment_id, user_id} = req.body

    if (! user_id) return res.status(200).json({status: "failed", reason: "user not found"})
    if (! post_id) return res.status(200).json({status: "failed", reason: "post not found"})

    try {

        const newReply = {
            text: reply.trim(),
            author: user_id.trim(),
            comment: comment_id.trim()
        }
        // firs inserting data to replyComments and taking
        // the id of it and saving it in comments reply field of it

        let result = await replyComments.insertMany(newReply)

        let ParentCommentSchema = await Comments.
            findOneAndUpdate(
                { post: post_id, comment: {$elemMatch: {_id: comment_id}}},
                { $push: {replies : result[0]._id }},
                { new: true }
            ).
            lean().
            exec()
        
        return res.status(200).json({
            status: "success",
            data: ParentCommentSchema
        })
    }
    catch( e ) {

        console.log('failed while saving comment reply')
        console.error(e)
        return res.status(200).json({
            status: "failed",
            reason: "server"
        })
    }
})

module.exports = router