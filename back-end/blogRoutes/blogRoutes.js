const router = require("express").Router()
const Post = require("../models/Blogs")
const SignedUpUser = require("../models/Register")
const Comment = require("../models/Comments")
const Likes = require("../models/postLikes")
const PostView = require("../models/PostViews")
const { formatDistanceToNow, formatDistanceToNowStrict, differenceInDays, subDays, format } = require("date-fns");
const Comments = require("../models/Comments")
const replyComments = require("../models/ReplyComments")
const Saved = require("../models/PostsSavedToAccount")
const json = require("jsonwebtoken");
const FollowingUser = require("../models/FollowingUsers")
const { body, validationResult, query } = require("express-validator")
const Notifications = require("../models/Notifications")
const { followMessage, commentMessage, replyMessage, likeMessage } = require("../utils/notification_data")
const FollowingNotification = require("../models/FollowingNotifications")
const PostNotifications = require("../models/PostNotification")
const CommentNotification = require("../models/CommentsNotifications")
const ReplyCommentNotification = require("../models/ReplyCommentNotification")
const PostLikes = require("../models/postLikes")
const PostLikesNotification = require("../models/LikePostNotification")
const nodemailer = require("nodemailer")
const OTPModel = require("../models/OTP")
const bcrypt = require("bcrypt");
const he = require("he")

router.get("/relevant_feed", async (req, res) => {
    
    // this route must return feeds that are based on user
    // currently following tags
    // if no tags are followed than random posts should be 
    // returned

    // but before this the tags part should be added to the post schema
    // at at least one tag is required for each post with the minimum length of 3

    // and js and javascript py or python these extenstions should be mappped 
    // for proper undrestanding of tags

    // tags added when creating posts
    
    // TODO: return posts based on tags the user is following

    try {
        
        let user_id = req.user_id

        if (! user_id) return res.status(401).json({message: "Unathorized"})
        
        let currentUserFollowingTags = await SignedUpUser.findById(user_id).lean().exec()

        // changing to lowercase before using it
        let userTags = currentUserFollowingTags?.socials ? currentUserFollowingTags?.socials.map( tag => `#${tag}`.toLowerCase()) : []

        let blogs
        let isPostsBasedOnTags = true // store if the posts selected is based on user following tags

        if (userTags.length) { // if user is following some tags then send the tags that intersects

            blogs = await Post.aggregate([
                { $match: { tags: { $in: userTags } } },
                {$limit: 20}
            ]).exec()

            // if the user following tags does not match any of the blogs then
            // select all of the blogs
            if (! blogs.length) {
                isPostsBasedOnTags = false
                blogs = await Post.aggregate([{ $sample: { size: 20}}]).exec()
            }
        }
        else {
            isPostsBasedOnTags = false
            blogs = await Post.aggregate([{ $sample: { size: 20}}]).exec()
        }
        // getting the that have at least one in common with user 
        
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
            const likes = await PostLikes.find({post_id: blog._id}).lean().exec()
            
            if (user_id) {
                const alreadySaved = await Saved.find({user: user_id, post: blog._id}).lean().exec()
                blog.saved = alreadySaved.length > 0
            }

            blog.likes = likes?.length
            blog.viewCount = views.length
        }

        completeBlogData.sort( (a, b) => b.viewCount - a.viewCount);
    
        return res.status(200).json({
            status: "success",
            data: completeBlogData,
            isPostsBasedOnTags
        });
  
    } catch (e) {  
        console.error(e, "fetching recent blogs path =>", req.path);
        res.status(200).json({
            status: "failed"
        });  
    }     
});


router.get(
    "/recent",
    query('post_id').notEmpty().isMongoId().escape(), 
    async (req, res) => 
    {
     
    // get thre recent posts only
    // steps: get the latest post date and from that filter the posts that are posted like a week a ago or 2 weeks ago
    // or something
        const result = validationResult(req)

        if (! result.isEmpty()) return res.status(400).json({message: "invalid post_id"})

        let {post_id} = req.query
        post_id = post_id !== 'null' ? post_id : null
        
        let user_id = req.user_id

        if (! user_id ) return res.status(404).send().json({"message: ": "user not found"})
        else if (! post_id ) return res.status(404).send().json({"message: ": "no post id"})
        
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
                const likes = await PostLikes.find({post_id: blog._id}).lean().exec()

                if (user_id) {
                    const alreadySaved = await Saved.find({user: user_id, post: blog._id}).lean().exec()
                    blog.saved = alreadySaved.length > 0
                }
                
                blog.viewCount = views.length
                blog.commentCount = blog.comments.length
                blog.likes = likes.length
            }

            let latestBlogPostedThreshold = completeBlogData.reduce( (latest, blog) => {
                if (!latest || blog.createdAt > latest.createdAt) return blog
                return latest
            }, null)
            
            const latestBlogCreatedAt = new Date(latestBlogPostedThreshold.createdAt);
            const fifteenDaysBeforeLatest = subDays(latestBlogCreatedAt, 15);

            let latestBlogs15DaysAfterLatestBlog = completeBlogData.filter( blog => {
                
                const blogDate = new Date(blog.createdAt)
                return blogDate >= fifteenDaysBeforeLatest && blogDate < latestBlogCreatedAt;
            })

            latestBlogs15DaysAfterLatestBlog = latestBlogs15DaysAfterLatestBlog.filter(blog => blog._id != post_id)
            latestBlogs15DaysAfterLatestBlog = latestBlogs15DaysAfterLatestBlog.slice(0, 4)
            
            return res.status(200).json({
                status: "success",
                data: latestBlogs15DaysAfterLatestBlog.reverse()
            });
            
        } catch (e) {  
            console.error(e, "fetching recent posts, path => ", req.path);
            return res.status(400).json({
                status: "failed"
            });  
        }     
    }
);


router.get("/top", async (req, res) => {
     
    /* this gets the most viewed blog first
    // then we set the threshold
    // and filter based on that threshold */

    // need the id for checking if user has saved the post
    // and chaning the UI accordingly
    let user_id = req.user_id
    
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
            
            if (user_id) {
                const alreadySaved = await Saved.find({user: user_id, post: blog._id}).lean().exec()
                blog.saved = alreadySaved.length > 0
            }    
            
            const likes = await PostLikes.find({post_id: blog._id}).lean().exec()
            
            blog.likes = likes?.length
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
        console.error(e, "fetching top blogs");
        res.status(200).json({
            status: "failed"
        });  
    }     
});
  
router.get(
    "/single_post",
    query('post_id').notEmpty().isMongoId().escape(), 
    async (req, res) => 
    
    {
        const result = validationResult(req)

        if (! result.isEmpty()) return res.status(400).json({message: "invalid post_id"})

        let { post_id = null } = req.query
        let user_id = req.user_id

        user_id = user_id === 'null' ? null : user_id;
        post_id = post_id === 'null' ? null : post_id;

        user_id = user_id === undefined ? null : user_id;
        post_id = post_id === undefined ? null : post_id;
        
        if (! user_id) return res.status(401).json({message: "unathorized"})
    
        else if (! post_id) return res.status(405).json({message: "not allowed"})
    
        if (post_id) {
            
            try {

                //Todo: handle if posts are deleted
                let singleBlog = await Post.findById(post_id).lean().exec();

                if (! singleBlog) {
                    return res.status(200).json({
                        status: "failed",
                        data: "notfound"
                    })
                }

                let singleBlogAuthor = await SignedUpUser.findById(singleBlog.author).lean().exec();
                singleBlog.profileUrl = singleBlogAuthor.profileUrl;
                singleBlog.username = singleBlogAuthor.username;
                singleBlog.joined = singleBlogAuthor.joined;
                singleBlog.email = singleBlogAuthor.email;
                singleBlog.distance = formatDistanceToNow(singleBlog.createdAt, {addSuffix: true}).replace("about", "")
                singleBlog.alreadyFollows = false
                
                const isUserFollowingThisUser = await FollowingUser.findOne({
                    user_id: user_id,
                    "follows.user": singleBlogAuthor._id
                }, {_id: 1})

                if (isUserFollowingThisUser) singleBlog.alreadyFollows = true

                return res.status(200).json({
                    status: "success",
                    data: singleBlog
                })
            } 
            
            catch (e ) {
                console.error(e, "fetching single blog");
                return res.status(200).json({message: "failed"})
            }
        }
        return res.status(200).json({message: "blog not found"})
    }
);


router.post(
    "/comment",
    body('post_id').notEmpty().isMongoId().escape(), 
    body('comment').notEmpty().escape(), 
    async (req, res) => 
    
    {
        const result = validationResult(req)
        if (! result.isEmpty()) return res.status(400).json({message: "invalid post_id", error: result.array()})
        
        let { post_id, comment} = req.body;
        
        // decoding the comment
        comment = decodeURIComponent(comment)
        comment = he.decode(comment)

        let author = req.user_id
        
        if (!author) return res.status(400).json({message: "invalid data provided"})
        
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
                
                let authorData = await SignedUpUser.findById(author).lean().exec()

                // same user should not get notifications for commenting on his/her post

                if (author !== singleBlog.author.toString()) {

                    let sendNotfication = new CommentNotification( {
                        receiver: singleBlog.author,
                        sender: author,
                        message: commentMessage(authorData.username),
                        post_id: post_id,
                        comment_id: newComment._id
                    } )
                    // notifying the user of the comment on his post
                    await sendNotfication.save()
                }
                return res.status(200).json({
                    status: "success",
                    data: "saved"
                })
            } 
            
            catch (e ) {
                console.error(e, "saving comment");
                return res.status(200).json({status: "failed", data: "server error"})
            }
        }
        return res.status(200).json({status: "failed", data: "post_id not provided"})
    }
);

router.post(
    "/get_post_comments",
    body('post_id').notEmpty().isMongoId().escape(), 
    async (req, res) => 
    {
        const result = validationResult(req)
        if (! result.isEmpty()) return res.status(400).json({message: "invalid post_id"})
        
        const {post_id} = req.body;
        
        if (post_id) {

            try {

                let comments = await Comment.find({post: post_id}).lean().exec();
                
                comments = comments.map(async comms => {
                    
                    comms.comment = await Promise.all(comms.comment.map(async comment => {
                    
                        const whoCommented = await SignedUpUser.findById(comment.author).lean().exec();

                        comment.distance = formatDistanceToNow(comment.commentedOn, {addSuffix: true}).replace("about", "")
                        
                        if (whoCommented) {
                        
                            comment.profileUrl = whoCommented?.profileUrl;
                            comment.username = whoCommented?.username;
                        }

                        // for the replies part
                        
                        
                        return comment;
                    }));
                    
                    comms.replies = await Promise.all(comms.replies.map( async reps => {

                        const repliesFromReplyCommentsSchema = await replyComments.findById(reps._id)
                        
                        const theUserWhoReplied = await SignedUpUser.findById(repliesFromReplyCommentsSchema.author).lean().exec()
                        
                        const theRepliedDistanceToNow = formatDistanceToNow(repliesFromReplyCommentsSchema.createdAt, {addSuffix: true}).replace("about", "")
                        
                        const repliesObjectDataOfEachUser = {}

                        if (theUserWhoReplied) {
                    
                            repliesObjectDataOfEachUser._id = theUserWhoReplied._id
                            repliesObjectDataOfEachUser.username = theUserWhoReplied.username
                            repliesObjectDataOfEachUser.profileUrl = theUserWhoReplied.profileUrl
                            repliesObjectDataOfEachUser.distanceToNow = theRepliedDistanceToNow
                            repliesObjectDataOfEachUser.date = repliesFromReplyCommentsSchema.createdAt
                            repliesObjectDataOfEachUser.body = repliesFromReplyCommentsSchema.text
                            repliesObjectDataOfEachUser.commen_id = repliesFromReplyCommentsSchema.comment
                        }

                        return repliesObjectDataOfEachUser;
                    
                    }))
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

                console.error(e, 'while getting comments')
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
    }
);


router.post(
    "/like_post",
    body('post_id').notEmpty().isMongoId().escape(),
    body('status').notEmpty().escape().isString(), 
    async (req, res) => 
    {

        const result = validationResult(req)

        if (! result.isEmpty()) return res.status(400).json({message: "invalid data provided", error: result.array()})

        let user_id = req.user_id
        
        const {status, post_id} = req.body;

        const post_id_exists = await Post.findById(post_id).lean().exec();
    
        if (! post_id_exists) return res.status(200).json({ status: "failed", data: "post not found" })

        const username = await SignedUpUser.findById(user_id).lean().exec()

        if (status) {
            
            let userExists = await PostLikes.findOne({liker: user_id, post_id: post_id}).lean().exec();
            
            if (userExists) { 
                
                if (userExists.likes === 0) {
                    /// adding one to the like

                    // sending like notification if is liked
                    // if the user is liking his own/her post
                    // notification should not be sent
                    
                    await Likes.findOneAndUpdate({'liker': user_id}, {$inc: {likes: 1}})
                    
                    if (post_id_exists.author.toString() !== user_id) {

                        const sendLikeNotification = new PostLikesNotification( {
                            receiver: post_id_exists.author,
                            sender: user_id,
                            message: likeMessage(username.username),
                            post_id: post_id
                        })
                        // notifying the user of the comment on his post
    
                        await sendLikeNotification.save()
                    }

                    return res.status(200).json({status: "success", data: "liked"})
                }
                // subtracting one
                await PostLikesNotification.findOneAndDelete({sender: user_id, post_id: post_id, receiver: post_id_exists.author})
                await Likes.findOneAndDelete({'liker': user_id}, {$inc: {likes: -1}})

                return res.status(200).json({status: "success", data: "disliked"})
            } 
            
            else {
                // new user liked should be added
                const newLiker = new Likes({
                    post_id,
                    likes: 1,
                    liker: user_id
                }) 
                
                // and notification be sent
                await newLiker.save();
                
                if (post_id_exists.author.toString() !== user_id) {

                    const sendLikeNotification = new PostLikesNotification( {
                        receiver: post_id_exists.author,
                        sender: user_id,
                        message: likeMessage(username.username),
                        post_id: post_id
                    })
                    await sendLikeNotification.save()
                }

                return res.status(200).json({status: "success", data: "liked"})
            }
        } 
        else {
            
            await Likes.findOneAndUpdate({'liker': user_id}, {$inc: {likes: -1}})
            await PostLikesNotification.findOneAndDelete({sender: user_id, post_id: post_id, receiver: post_id_exists.author})
            return res.status(200).json({status: "success", data: "disliked and subtracted one"})
        }
    }
);


router.get(
    "/get_likes_comments_count",
    query('post_id').notEmpty().isMongoId().escape(), 
    async (req, res) => 
    
    {
        const result = validationResult(req)
        
        if (! result.isEmpty()) return res.status(400).json({message: "invalid post_id"})

        let {post_id} = req.query;     

        let user_id = req.user_id
        
        if (post_id) {

            let view_count = await PostView.find({'post_id': post_id}).lean().exec();
            let commentCount = await Comment.find({'post': post_id}).lean().exec();
            let likes_count = await PostLikes.find({'post_id': post_id, likes: {$eq: 1}}).lean().exec()
            
            let already_user_liked = await PostLikes.findOne({'post_id': post_id, 'liker': user_id, likes: { $eq: 1}}).lean().exec()

            if (view_count) {
                return res.status(200).json({status: "success", view_count, commentCount, likes_count, already_user_liked: already_user_liked ? already_user_liked.likes : 0})
            }
        }
        return res.status(200).json({status: "failed", data: "post not found"})

    }
);

router.post(
    "/save_new_visitor",
    body('post_id').notEmpty().isMongoId().escape(), 
    async (req, res) => 
    {
        
        const result = validationResult(req)
        if (! result.isEmpty()) return res.status(400).json({message: "invalid post_id"})

        let { post_id } = req.body;
        let user_id = req.user_id 

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
    }
)


// the following is for deleting blogs:

router.delete(
    "/delete_post",
    query('post_id').notEmpty().isMongoId().escape(),
    async (req, res) => 
    
    {
        
        const result = validationResult(req)
        if (! result.isEmpty()) return res.status(400).json({message: "invalid post_id"})

        let {post_id} = req.query
        
        if (! post_id) return res.status(200).json({status: "failed", reason: "post_id not provided"})

        let user_id = req.user_id
        try {
            
            const blogExists = await Post.findById(post_id).lean().exec()

            if (blogExists) {

                // deleting the blog from the database
                await Post.findByIdAndRemove(post_id)
                await Comment.deleteMany({ post: post_id })
                await Likes.deleteMany({ post_id })
                await PostView.deleteMany({ post_id })
                await replyComments.deleteMany({ post_id })
                
                // removing notifications assocaited with that post
                await PostLikesNotification.deleteMany({post_id: post_id, sender: user_id})
                await CommentNotification.deleteMany({post_id: post_id, sender: user_id})
                await ReplyCommentNotification.deleteMany({post_id: post_id, sender: user_id})
                await PostNotifications.deleteMany({post_id: post_id, sender: user_id})

                return res.status(200).json({
                    status: "success",
                })

            } else {
                return res.status(200).json({
                    status: "failed",
                    reason: "notfound"
                })
            }
        } catch (e) {
            console.error("exception happened while deleting a post => () ", e)
            return res.status(200).json({
                status: "failed",
                reason: "server"
            })
        }
    }
)

router.post(
    
    "/save_comment_reply",
    
    body('post_id').notEmpty().isMongoId().escape(), 
    body('comment_id').notEmpty().isMongoId().escape(), 
    body('reply').notEmpty().escape(), 
    
    async (req, res) =>
    
    {
        const result = validationResult(req)
        if (! result.isEmpty()) return res.status(400).json({message: "invalid post_id"})

        let {post_id, reply, comment_id} = req.body
        let user_id = req.user_id

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
                    
            
            // send notifications to the user
            let blogAuthorData = await Post.findById(post_id).lean().exec()
            
            // and send the notifications if it's other than the user who made the comment
            // so a user should not get notifications if he replies to his or her own
            // comment
            
            // this condition is good if the sender of the 
            if (user_id !== blogAuthorData.author.toString()) {
                
                let authorData = await SignedUpUser.findById(user_id).lean().exec()

                // the receiver should be the author of the comment not the author of the post

                let sendNotfication = new ReplyCommentNotification( {
                    receiver: ParentCommentSchema.comment[0].author,
                    sender: user_id,
                    message: replyMessage(authorData.username),
                    post_id: post_id,
                    comment_id: comment_id,
                } )
                // notifying the user of the comment on his post
                await sendNotfication.save()
            }
            return res.status(200).json({
                status: "success",
                data: ParentCommentSchema
            })
        }
        catch( e ) {

            console.error('failed while saving comment reply')
            console.error(e)
            return res.status(200).json({
                status: "failed",
                reason: "server"
            })
        }
    }
)

// making a new route for the latest posts
// how to determine the latest posts ???

router.get("/recent_posts", async (req, res) => {
    
    let user_id = req.user_id

    if (! user_id) return res.status(200).json({status: "failed", reason: "user not found"})
    
    try {
        // first getting the latest post from db
        // Get the latest post
        const latestPostPosted = await Post.find()
            .sort({ createdAt: -1 })
            .limit(1)
            .lean()
            .exec();

        if (latestPostPosted.length > 0) {
            
            let allPostesPosted = await Post.find().lean().exec()
            let postsInLast15Days = allPostesPosted.filter(post => {
                let postDate = new Date(post.createdAt)
                return differenceInDays(postDate, latestPostPosted[0].createdAt) <= 15
            })

            const authorIds = postsInLast15Days.map(blog => blog.author);
            const authorDataPromises = authorIds.map(authorId => SignedUpUser.findById(authorId).lean().exec());
            const authorData = await Promise.all(authorDataPromises);
            
            postsInLast15Days = postsInLast15Days.map((blog, index) => {
                
                blog.profileUrl = authorData[index].profileUrl;
                blog.username = authorData[index].username;
                blog.viewCount = 0
                blog.commentCount = 0
                blog.distance = formatDistanceToNowStrict((blog.createdAt), {addSuffix: true}).replace("about", "")
                return blog;
            })

            for (const blog of postsInLast15Days) {
                
                const views = await PostView.find({post_id: blog._id}).lean().exec()

                if (user_id) {
                    const alreadySaved = await Saved.find({user: user_id, post: blog._id}).lean().exec()
                    blog.saved = alreadySaved.length > 0
                }

                const likes = await PostLikes.find({post_id: blog._id}).lean().exec()
                
                blog.likes = likes?.length
                blog.viewCount = views?.length
                blog.commentCount = blog.comments?.length
            }

            postsInLast15Days.sort((a, b) => b.createdAt > a.createdAt ? 1 : -1)
            return res.status(200).json({
                status: "success",
                data: postsInLast15Days 
            })
            
        } 
        else {
            return res.status(200).json({
                status: "failed",
                reason: "no latest post found"
            })
        }
    }    
    catch( e ) {
        
        console.error("error fetching recent post: => ", e)
        
        return res.status(200).json({
            status: "failed",
            reason: "server"
        })
    }
})

router.post(
    
    "/save_post",
    body('post_id').notEmpty().isMongoId().escape(), 
    body('user_id').notEmpty().isMongoId().escape(), 
    async (req, res) => {

        const result = validationResult(req)
        if (! result.isEmpty()) return res.status(400).json({message: "invalid post_id", error: result.array()})

        const {user_id, post_id} = req.body 
        
        if (! user_id ) {
            return res.status(200).json({
                status: "failed",
                reason: "user_id required"
            })
        }

        else if (! post_id) {
            return res.status(200).json({
                status: "failed",
                reason: "post_id required"
            })
        }

        try {
            
            const alreadySaved = await Saved.find({user: user_id, post: post_id}).lean().exec()

            if (alreadySaved?.length > 0) {
                await Saved.deleteOne({user: user_id, post: post_id})
                return res.status(200).json({message: "deleted"})
            } else {
                let saveNewPostToAccount = new Saved({
                    user: user_id,
                    post: post_id
                })
                await saveNewPostToAccount.save()
                return res.status(200).json({message: "saved"})
            }
        }
        catch (e) {
            
            console.error("error saving post to account: => ", e)
            
            return res.status(200).json({
                status: "failed",
                reason: "server"
            })
        }
    }
)

router.get("/posts_saved", async (req, res) => {
    
    let user_id = req.user_id
    
    if (! user_id ) {
        return res.status(200).json({
            status: "failed",
            reason: "user_id required"
        })
    }

    try {
        
        let postsSaved = await Saved.find({user: user_id}).lean().exec()

        if (postsSaved?.length > 0) {

            // getting user details
            const detailsOfUserWhoSavedPost = await SignedUpUser.findById(user_id).lean().exec();

            postsSaved = await Promise.all(postsSaved.map(async (post) => {
                
                const currentSavedPost = await Post.findById(post.post).lean().exec();

                if (currentSavedPost) {
                
                    const views = await PostView.find({ post_id: currentSavedPost._id }).lean().exec();
                
                    return {
                        ...currentSavedPost,
                        profileUrl: detailsOfUserWhoSavedPost.profileUrl,
                        username: detailsOfUserWhoSavedPost.username,
                        distance: formatDistanceToNowStrict(currentSavedPost.createdAt, { addSuffix: true }).replace("about", ""),
                        viewCount: views.length,
                        saved: true,
                        savedAtDifference: formatDistanceToNowStrict(post.savedAt, { addSuffix: true }).replace("about", ""),
                        savedAt: post.savedAt
                    };
                }
                return post;
            }));

            // some users might delete the posts which are saved in another account
            // so i should filter thos posts which are deleted
            
            postsSaved = postsSaved.sort( (a, b) => {
                const dateA = new Date(a.savedAt).getTime()
                const dateB = new Date(b.savedAt).getTime()
                return dateB - dateA
            })

            const isSortedByViewCount = postsSaved.every((post, index, array) => {
                if (index < array.length - 1) {
                    return post.viewCount >= array[index + 1].viewCount;
                }
                return true;
            });

            postsSaved = postsSaved.filter( post => post.comments ? post : null)
            
            return res
                .status(200)
                .json( {
                    message: "success",
                    data: postsSaved,
                    isSortedByViewCount: isSortedByViewCount
                })
        } 
        else {
            return res.status(200).json({message: "zeroSaved"})
        }
    }
    
    catch (e) {
        
        console.error("error saving post to account: => ", e)
        
        return res.status(200).json({
            status: "failed",
            reason: "server"
        })
    }
})

router.get(
    "/follow",
    query('to_followed_user').notEmpty().isMongoId().escape(),
    async (req, res) => 
    
    {
        const result = validationResult(req)
        if (! result.isEmpty()) return res.status(400).json({message: "invalid post_id"})

        let {to_followed_user = null} = req.query
        let user_id = req.user_id
        
        if (! user_id) return res.status(401).json({message: "unathorized"})

        else if (! to_followed_user) res.status(405).json({message: "not allowed"})

        try {
            const followingUser = await FollowingUser.findOne({user_id: user_id}).lean().exec()

            if (followingUser) {

                const alreadyFollowingTheUser = followingUser.follows.some(
                    user => user.user.toString() === to_followed_user.toString()
                )

                if (alreadyFollowingTheUser) {

                    const alreadyFollowingThenUPdate = await FollowingUser.findOneAndUpdate(
                        {user_id: user_id},
                        {
                            $pull: {
                                follows: {
                                    user: to_followed_user
                                }
                            }
                        },
                        {
                            new: true,
                        }
                    )

                    // now we must also push the notification to it
                    
                    return res.status(200).json({message: "unfollowing", data: alreadyFollowingThenUPdate})
                }

                // then follow the user
                else {
                    const followNewUser = await FollowingUser.findOneAndUpdate(
                        {user_id: user_id},
                        {
                            $push: {
                                follows: {
                                    user: to_followed_user
                                }
                            }
                        },
                        {
                            new: true, 
                            upsert: true
                        }
                    )
                    
                    let toReceiveNotificationsUser = await SignedUpUser.findById(user_id).lean().exec()
                    
                    let toRecieveNotificationName = toReceiveNotificationsUser?.username || toReceiveNotificationsUser?.fullName
                    
                    let sendNotfication = await new FollowingNotification({
                        receiver: to_followed_user,
                        sender: user_id,
                        message: followMessage(toRecieveNotificationName),
                    })
                    
                    await sendNotfication.save()
                    return res.status(200).json({message: "following", data: followNewUser})
                }

            } // the user is new, he/she is not following anyone so create a new document instead
            else {
                const newUserTobeFollowed = new FollowingUser({
                    user_id: user_id,
                    follows: [{user: to_followed_user}]
                })

                await newUserTobeFollowed.save()
                return res.status(200).json({message: "new", data: newUserTobeFollowed})
            }

        }
        catch(e) {
            console.error("error while following user: => ", e, req.path)
            return res.status(500).json({message: "server error"})
        }
    }
)

router.get("/get_follower", async (req, res) => {

    const user_id = req.user_id

    if (!user_id) return res.status(200).json({message: "user not found"})

    try {
        
        const followers = await FollowingUser
            .find({
                "follows.user": user_id
            })
            .lean()
            .exec()
        
        let followedByDataArr = []
        
        if (followers.length) {
            
            await Promise.all(
            
                followers.map(async follower => {
            
                    const followersData = await SignedUpUser.findById(follower.user_id)
            
                    if (followersData) {
            
                        delete followersData.password
                        
                        const numberOfPosts = await Post.find({author: followersData._id}).lean().exec()
                        const numberOfFollowers = await FollowingUser.find({follows: {$elemMatch: {user: followersData._id}}}).lean().exec()
                        const numberOfFollowing = await FollowingUser.findOne({user_id: followersData._id}).lean().exec()
                        const isUserFollowingThisUser = await FollowingUser.findOne({
                            user_id: user_id,
                            "follows.user": followersData._id
                        }, {_id: 1})

                        followedByDataArr.push({
                            ...followersData.toObject(),
                            numberOfPosts: numberOfPosts.length,
                            numberOfFollowers: numberOfFollowers.length,
                            numberOfFollowing: numberOfFollowing.follows.length,
                            isFollowing: isUserFollowingThisUser ? true : false,
                            distance: formatDistanceToNowStrict((followersData.joined), {addSuffix: true}).replace("about", "")
                        })
                    }
                    return follower
                })
            )
            
            return res.status(200).json({message: "success", data: followedByDataArr})

        } 
        
        else {

            return res.status(200).json({message: "success", data: "zero"})
        }

    } catch( error) {
        console.error("error while getting followers: => ", error, req.path)
        return res.status(404).json({message: "user not found"})
    }
})


router.get("/get_following", async (req, res) => {

    const user_id = req.user_id

    if (!user_id) return res.status(200).json({message: "user not found"})

    try {
        
        const following = await FollowingUser
            .findOne({
                user_id: user_id
            })
            .lean()
            .exec()
        
        let ListOfFollowingUsers = []
        
        if (following?.follows.length) {
            
            await Promise.all(
            
                following.follows.map(async followingUsers => {
            
                    const followersData = await SignedUpUser.findById(followingUsers.user)
            
                    if (followersData) {
            
                        delete followersData.password
                        
                        const numberOfPosts = await Post.find({author: followersData._id}).lean().exec()
                        const numberOfFollowers = await FollowingUser.find({follows: {$elemMatch: {user: followersData._id}}}).lean().exec()
                        const numberOfFollowing = await FollowingUser.findOne({user_id: followersData._id}).lean().exec()
                        const isUserFollowingThisUser = await FollowingUser.findOne({
                            user_id: user_id,
                            "follows.user": followersData._id
                        }, {_id: 1})

                        ListOfFollowingUsers.push({
                            ...followersData.toObject(),
                            numberOfPosts: numberOfPosts.length,
                            numberOfFollowers: numberOfFollowers.length,
                            numberOfFollowing: numberOfFollowing?.follows ? numberOfFollowing?.follows.length : 0,
                            isFollowing: isUserFollowingThisUser ? true : false,
                            distance: formatDistanceToNowStrict((followersData.joined), {addSuffix: true}).replace("about", "")
                        })
                    }
                    return followingUsers
                })
            )
            
            return res.status(200).json({message: "success", data: ListOfFollowingUsers})

        } 
        
        else {

            return res.status(200).json({message: "success", data: "zero"})
        }

    } catch( error) {
        console.error("error while getting followers: => ", error, req.path)
        return res.status(404).json({message: "user not found"})
    }
})

router.get(
    "/my_profile",
    query('user_id').notEmpty().isMongoId().escape(), 
    async (req, res) => 
    {
        
        const result = validationResult(req)

        if (! result.isEmpty()) return res.status(400).json({message: "invalid user_id"})
        
        let { user_id } = req.query
        const my_id = req.user_id
        
        if (! my_id) return res.status(401).json({message: "unathorized"})
        if (!user_id) return res.status(200).json({message: "user not found"})

        try {
            
            const user = await SignedUpUser.findById(user_id).lean().exec()
            const numberOfPosts = await Post.find({author: user_id}).lean().exec()
            const numberOfFollowers = await FollowingUser.find({follows: {$elemMatch: {user: user_id}}}).lean().exec()
            const numberOfFollowing = await FollowingUser.findOne({user_id: user_id}).lean().exec()
            const alreadyFollowingTheUser = await FollowingUser.findOne({user_id: my_id, follows: {$elemMatch: {user: user_id}}}).lean().exec()
            
            const data = {
                user,
                numberOfPosts: numberOfPosts.length || 0,
                numberOfFollowers: numberOfFollowers.length || 0,
                numberOfFollowing: numberOfFollowing?.follows ? numberOfFollowing.follows.length : 0,
                alreadyFollowingTheUser: alreadyFollowingTheUser ? true : false,
            }
            if (user) {
                delete user.password
                return res.status(200).json({message: "success", data: data})
            }
            else {
                return res.status(200).json({message: "success", data: "zero"})
            }

        } catch( error) {
            console.error("error while getting followers: => ", error, req.path)
            return res.status(404).json({message: "user not found"})
        }
    }
)

router.get(
    "/get_user_followers",
    query('user_id').notEmpty().isMongoId().escape(), 
    async (req, res) => {

        const result = validationResult(req)
        
        if (! result.isEmpty()) return res.status(400).json({message: "invalid user_id"})
        
        const {user_id} = req.query

        if (!user_id) return res.status(200).json({message: "user not found"})

        try {
            
            const followers = await FollowingUser
                .find({
                    "follows.user": user_id
                })
                .lean()
                .exec()
            
            let followedByDataArr = []
            
            if (followers.length) {
                
                await Promise.all(
                
                    followers.map(async follower => {
                
                        const followersData = await SignedUpUser.findById(follower.user_id)
                
                        if (followersData) {
                
                            delete followersData.password
                            
                            const numberOfPosts = await Post.find({author: followersData._id}).lean().exec()
                            const numberOfFollowers = await FollowingUser.find({follows: {$elemMatch: {user: followersData._id}}}).lean().exec()
                            const numberOfFollowing = await FollowingUser.findOne({user_id: followersData._id}).lean().exec()
                            const isUserFollowingThisUser = await FollowingUser.findOne({
                                user_id: user_id,
                                "follows.user": followersData._id
                            }, {_id: 1})

                            followedByDataArr.push({
                                ...followersData.toObject(),
                                numberOfPosts: numberOfPosts.length,
                                numberOfFollowers: numberOfFollowers.length,
                                numberOfFollowing: numberOfFollowing.follows.length,
                                isFollowing: isUserFollowingThisUser ? true : false,
                                distance: formatDistanceToNowStrict((followersData.joined), {addSuffix: true}).replace("about", "")
                            })
                        }
                        return follower
                    })
                )
                
                return res.status(200).json({message: "success", data: followedByDataArr})

            } 
            
            else {

                return res.status(200).json({message: "success", data: "zero"})
            }

        } catch( error) {
            console.error("error while getting followers: => ", error, req.path)
            return res.status(404).json({message: "user not found"})
        }
    }
)

router.get(
    "/get_user_following",
    query('user_id').notEmpty().isMongoId().escape(), 
    async (req, res) => 
    {

        const result = validationResult(req)
        
        if (! result.isEmpty()) return res.status(400).json({message: "invalid user_id"})

        const user_id = req.query.user_id

        if (!user_id) return res.status(200).json({message: "user not found"})

        try {
            
            const following = await FollowingUser
                .findOne({
                    user_id: user_id
                })
                .lean()
                .exec()
            
            let ListOfFollowingUsers = []
            
            if (following?.follows?.length) {
                
                await Promise.all(
                
                    following.follows.map(async followingUsers => {
                
                        const followersData = await SignedUpUser.findById(followingUsers.user)
                
                        if (followersData) {
                
                            delete followersData.password

                            const numberOfPosts = await Post.find({author: followersData._id}).lean().exec()
                            const numberOfFollowers = await FollowingUser.find({follows: {$elemMatch: {user: followersData._id}}}).lean().exec()
                            const numberOfFollowing = await FollowingUser.findOne({user_id: followersData._id}).lean().exec()
                            
                            const isUserFollowingThisUser = await FollowingUser.findOne({
                                user_id: user_id,
                                "follows.user": followersData._id
                            }, {_id: 1})

                            ListOfFollowingUsers.push({
                                ...followersData.toObject(),
                                numberOfPosts: numberOfPosts.length,
                                numberOfFollowers: numberOfFollowers.length,
                                numberOfFollowing: numberOfFollowing?.follows ? numberOfFollowing?.follows.length : 0,
                                isFollowing: isUserFollowingThisUser ? true : false,
                                distance: formatDistanceToNowStrict((followersData.joined), {addSuffix: true}).replace("about", "")
                            })
                        }
                        return followingUsers
                    })
                )
                
                return res.status(200).json({message: "success", data: ListOfFollowingUsers})

            } 
            
            else {

                return res.status(200).json({message: "success", data: "zero"})
            }

        } catch( error) {
            console.error("error while getting followers: => ", error, req.path)
            return res.status(404).json({message: "user not found"})
        }
    }
)

router.get("/my_following_posts", async (req, res) => {
    
    const user_id = req.user_id
    
    if (!user_id) return res.status(200).json({message: "user not found"})
    
    try {
        
        const following = await FollowingUser.findOne({user_id: user_id}).lean().exec()
        
        if (following) {
            const followingPosts = await Post.find({author: {$in: following.follows.map(follow => follow.user)}}).lean().exec()
            
            const authorIds = followingPosts.map(blog => blog.author);
            const authorDataPromises = authorIds.map(authorId => SignedUpUser.findById(authorId).lean().exec());
            const authorData = await Promise.all(authorDataPromises);
        
            const completeBlogData = followingPosts.map((blog, index) => {
                blog.profileUrl = authorData[index].profileUrl;
                blog.username = authorData[index].username;
                blog.viewCount = 0
                blog.commentCount = 0
                blog.distance = formatDistanceToNowStrict((blog.createdAt), {addSuffix: true}).replace("about", "")
                return blog;
            });

            for (const blog of completeBlogData) {
                
                const views = await PostView.find({post_id: blog._id}).lean().exec()
                const likes = await PostLikes.find({post_id: blog._id}).lean().exec()
                
                if (user_id) {
                    const alreadySaved = await Saved.find({user: user_id, post: blog._id}).lean().exec()
                    blog.saved = alreadySaved.length > 0
                }
            
                blog.likes = likes?.length
                blog.viewCount = views.length || 0
                blog.commentCount = blog.comments.length
            }

            return res.status(200).json({message: "success", data: completeBlogData, zero: completeBlogData.length ? true : false})
        }
        return res.status(200).json({message: "success", data: "zero"})
    } catch(e) {
        console.error("error in while getting following posts", e)
        return res.status(404).json({message: "user not found"})
    }
})

router.get(
    "/same_tags_posts",
    query('tag').notEmpty().escape(), 
    async (req, res) => {
        
        const result = validationResult(req)
        
        if (! result.isEmpty()) return res.status(400).json({message: "invalid tag"})

        let {tag} = req.query

        tag = decodeURIComponent(tag)

        let userTags = tag.split(",")
        let user_id = req.user_id
        
        try {
            
            const posts = await Post.aggregate([
                { $match: { tags: { $in: userTags } } },
                {$limit: 20}
            ])
            
            if (posts.length) {
                
                const authorIds = posts.map(blog => blog.author);
                const authorDataPromises = authorIds.map(authorId => SignedUpUser.findById(authorId).lean().exec());
                const authorData = await Promise.all(authorDataPromises);
            
                const completeBlogData = posts.map((blog, index) => {
                    blog.profileUrl = authorData[index].profileUrl;
                    blog.username = authorData[index].username;
                    blog.viewCount = 0
                    blog.commentCount = 0
                    blog.distance = formatDistanceToNowStrict((blog.createdAt), {addSuffix: true}).replace("about", "")
                    return blog;
                });
            
                for (const blog of completeBlogData) {
                    
                    const views = await PostView.find({post_id: blog._id}).lean().exec()
                    
                    if (user_id) {

                        const alreadySaved = await Saved.find({user: user_id, post: blog._id}).lean().exec()
                        blog.saved = alreadySaved.length > 0
                    }
                    const likes = await PostLikes.find({post_id: blog._id}).lean().exec()
            
                    blog.likes = likes?.length
                    blog.viewCount = views.length
                }

                return res.status(200).json({message: "success", data: completeBlogData})
            }
            return res.status(200).json({message: "success", zero: true})
        }
        catch(e) {
            console.error("error in while getting same tags posts", e)
            return res.status(200).json({message: "success", zero: true})
        }
    }
)

router.get("/has_notifications", async (req, res) => {

    const user_id = req.user_id
    
    if (! user_id) return res.status(400).json({message: "invalid user"})
    
    try {
        
        let totalUnreadNotifications = 0
        const followingNotification = await FollowingNotification.find(
            {
                receiver: user_id,
                isRead: false
            }
        ).lean().exec()
        
        const postNotification = await PostNotifications.find(
            {
                receiver: user_id,
                isRead: false
            }
        ).lean().exec()

        const commentNotification = await CommentNotification.find({
            receiver: user_id,
            isRead: false
        }).lean().exec()

        const replyCommentNotification = await ReplyCommentNotification.find({
            receiver: user_id,
            isRead: false
        })

        const postLikeNotiFication = await PostLikesNotification.find({
            receiver: user_id,
            isRead: false
        })

        totalUnreadNotifications = followingNotification?.length || 0 + postNotification?.length || 0 + commentNotification?.length || 0 + replyCommentNotification?.length || 0 + postLikeNotiFication.length || 0
        
        return res.status(200).json({data: totalUnreadNotifications})

    } catch(e) {
        console.error("while fetching user notifications", e)
    }
})

router.get("/user_notifications", async (req, res) => {

    // getting all the notifications

    const user_id = req.user_id
    
    if (! user_id) return res.status(200).json({message: "invalid user"})
    
    try {
        
        // sorting user notfications first
        const userNotifications = await FollowingNotification.
            find
            (
                {
                    receiver: {
                        $eq: user_id
                    }
                }
            )
        
        const postNotifications = await PostNotifications.find(
            {
                receivers: {
                    $eq: user_id
                }
            }
        )

        let dataToSendBack = []
        
        let completeDataOfSenders = Promise.all(
            
            userNotifications.map( async user => {
        
                const currentSenderData = await SignedUpUser.findById(user.sender)

                const date_difference = formatDistanceToNowStrict((user.At), {addSuffix: true}).replace("about", "")
                
                if (currentSenderData) {
                    dataToSendBack.push({
                        ...user.toObject(),
                        profileUrl: currentSenderData.profileUrl,
                        notifier_id : currentSenderData._id,
                        date_difference,
                    })
                }
            }),
        )
        
        completeDataOfSenders = await completeDataOfSenders
        
        await Promise.all(
            
            postNotifications.map( async post => {
                
                const currentSenderData = await SignedUpUser.findById(post.sender)

                const date_difference = formatDistanceToNowStrict((post.At), {addSuffix: true}).replace("about", "")
                
                if (currentSenderData) {
                    dataToSendBack.push({
                        ...post.toObject(),
                        profileUrl: currentSenderData.profileUrl,
                        notifier_id : currentSenderData._id,
                        date_difference
                    })
                }
            })
        )

        let commentNotifications = await CommentNotification.find({receiver: user_id})

        await Promise.all(
            
            commentNotifications.map( async comment => {
                
                const currentSenderData = await SignedUpUser.findById(comment.sender)

                const date_difference = formatDistanceToNowStrict((comment.At), {addSuffix: true}).replace("about", "")
                
                if (currentSenderData) {
                    dataToSendBack.push({
                        ...comment.toObject(),
                        profileUrl: currentSenderData.profileUrl,
                        notifier_id : currentSenderData._id,
                        date_difference
                    })
                }
            }
            )
        )

        let replyCommentsNotification = await ReplyCommentNotification.find({receiver: user_id})

        await Promise.all(
            
            replyCommentsNotification.map( async reply => {
                
                const currentSenderData = await SignedUpUser.findById(reply.sender)

                const date_difference = formatDistanceToNowStrict((reply.At), {addSuffix: true}).replace("about", "")
                
                if (currentSenderData) {
                    dataToSendBack.push({
                        ...reply.toObject(),
                        profileUrl: currentSenderData.profileUrl,
                        notifier_id : currentSenderData._id,
                        date_difference
                    })
                }
            
            })
        )
        
        let postLikesNoti = await PostLikesNotification.find({receiver: user_id}).lean().exec()

        await Promise.all(
            
            postLikesNoti.map( async liker => {
                
                const currentSenderData = await SignedUpUser.findById(liker.sender)

                const date_difference = formatDistanceToNowStrict((liker.At), {addSuffix: true}).replace("about", "")
                
                if (currentSenderData) {
                    dataToSendBack.push({
                        ...liker,
                        profileUrl: currentSenderData.profileUrl,
                        notifier_id : currentSenderData._id,
                        date_difference
                    })
                }
            })
        )

        dataToSendBack = dataToSendBack.sort( (a, b) => {
            const firstDate = new Date(a.At)
            const secondDate = new Date(b.At)

            return secondDate - firstDate
        })

        return res.status(200).json({followersNotification: dataToSendBack})

    } 
    
    catch( e ) {
        console.error(e, 'while getting user notifications')
        return res.status(200).json({message: "failed"})
    }
})

router.get(
    "/mark_notification",
    query('notification_id').notEmpty().escape().optional(),
    query("post_id").notEmpty().escape().optional(),
    async (req, res) => 
    {
    
        let error = validationResult(req)
        if (! error.isEmpty()) return res.status(200).json({message: "invalid notification id", data: error.array()})

        try {

            let user_id = req.user_id

            let {notification_id, post_id, notification_type} = req.query
            
            notification_id = decodeURIComponent(notification_id)
            notification_type = String(decodeURIComponent(notification_type))
            
            if (notification_type === "post") {
                await PostNotifications.findByIdAndUpdate(notification_id, {isRead: true})
            }

            else if (notification_type === "comment") {
                await CommentNotification.findByIdAndUpdate(notification_id, {isRead: true})
            } 
            
            else if (notification_type === "replied") {
                await ReplyCommentNotification.findByIdAndUpdate(notification_id, {isRead: true})
            }

            else if (notification_type === "follow") {
                await FollowingNotification.findByIdAndUpdate(notification_id, {isRead: true})
            }

            else if (notification_type === "like") {
                await PostLikesNotification.findByIdAndUpdate(notification_id, {isRead: true})
            }
           
            return res.status(200).json({status: "success", message: "marked"})
        } 
        
        catch(e) {
            console.error("error while marking notification", e)
            return res.status(200).json({message: "failed"})
        }
    }
)

router.get(
    "/search_posts",
    query('post').notEmpty().escape(), 
    async (req, res) => 
    {
        const result = validationResult(req)

        if (! result.isEmpty()) return res.status(400).json({message: "invalid post"})

        let {post} = req.query

        post = decodeURIComponent(post)

        let user_id = req.user_id

        try {
            const posts = await Post.find(
                {
                    $text: {
                        $search: post
                    }
                }
            ).lean().exec()
            
            if (posts.length) {
                
                const authorIds = posts.map(blog => blog.author);
                const authorDataPromises = authorIds.map(authorId => SignedUpUser.findById(authorId).lean().exec());
                const authorData = await Promise.all(authorDataPromises);
            
                const completeBlogData = posts.map((blog, index) => {
                    blog.profileUrl = authorData[index].profileUrl;
                    blog.username = authorData[index].username;
                    blog.viewCount = 0
                    blog.commentCount = 0
                    blog.distance = formatDistanceToNowStrict((blog.createdAt), {addSuffix: true}).replace("about", "")
                    return blog;
                });
            
                for (const blog of completeBlogData) {
                    
                    const views = await PostView.find({post_id: blog._id}).lean().exec()
                    
                    if (user_id) {

                        const alreadySaved = await Saved.find({user: user_id, post: blog._id}).lean().exec()
                        blog.saved = alreadySaved.length > 0
                    }
                    
                    const likes = await PostLikes.find({post_id: blog._id}).lean().exec()
                    
                    blog.likes = likes?.length
                    blog.viewCount = views.length
                }
                
                return res.status(200).json({message: "success", data: completeBlogData})

            }
            return res.status(200).json({message: "success", zero: true})
        
        } catch ( e ) {
            console.error("error while searching for posts", e)
            return res.status(200).json({message: "failed"})
        }
    }
)

router.get(
    "/search_users", 
    query('user').notEmpty().escape(),
    async (req, res) => 
    {
        const result = validationResult(req)

        if (! result.isEmpty()) return res.status(400).json({message: "invalid post"})

        let {user} = req.query

        user = decodeURIComponent(user)

        let user_id = req.user_id

        try {
        
            const followers = await SignedUpUser
                .find({
                    $or: [
                        {username: {$regex: user, $options: 'i'}},
                        {fullName: {$regex: user, $options: 'i'}}
                    ]
                })
                .lean()
                .exec()
            
            let followedByDataArr = []
            
            if (followers.length) {
                
                await Promise.all(
                
                    followers.map(async follower => {
                        
                        delete follower.password
                        delete follower.email

                        follower.distance = formatDistanceToNowStrict((follower.joined), {addSuffix: true}).replace("about", "")
                        const numberOfPosts = await Post.find({author: follower._id}).lean().exec()
                        const numberOfFollowers = await FollowingUser.find({follows: {$elemMatch: {user: follower._id}}}).lean().exec()
                        const numberOfFollowing = await FollowingUser.findOne({user_id: follower._id}).lean().exec()
                        
                        const isUserFollowingThisUser = await FollowingUser.findOne({
                            user_id: user_id,
                            "follows.user": follower._id
                        }, {_id: 1})

                        followedByDataArr.push({
                            ...follower,
                            numberOfPosts: numberOfPosts?.length || 0,
                            numberOfFollowers: numberOfFollowers?.length || 0,
                            numberOfFollowing: numberOfFollowing?.follows?.length || 0,
                            isFollowing: isUserFollowingThisUser ? true : false
                        })
                        
                        return follower
                    })
                )
                
                return res.status(200).json({message: "success", data: followedByDataArr})
    
            } 
            
            return res.status(200).json({message: "success", zero: true})
            
    
        } catch( error) {
            console.error("error while getting followers: => ", error, req.path)
            return res.status(404).json({message: "user not found"})
        }
    }
)

router.get(
    "/search_tags",
    query('tag').notEmpty().escape(), 
    async (req, res) => {
        
        const result = validationResult(req)
        
        if (! result.isEmpty()) return res.status(400).json({message: "invalid tag"})

        let {tag} = req.query

        tag = '#' + decodeURIComponent(tag)

        let userTags = tag.split(",")
        let user_id = req.user_id
        
        try {
            
            const posts = await Post.find({tags: {$in: userTags}}).lean().exec()

            if (posts.length) {
                
                const authorIds = posts.map(blog => blog.author);
                const authorDataPromises = authorIds.map(authorId => SignedUpUser.findById(authorId).lean().exec());
                const authorData = await Promise.all(authorDataPromises);
            
                const completeBlogData = posts.map((blog, index) => {
                    blog.profileUrl = authorData[index].profileUrl;
                    blog.username = authorData[index].username;
                    blog.viewCount = 0
                    blog.commentCount = 0
                    blog.distance = formatDistanceToNowStrict((blog.createdAt), {addSuffix: true}).replace("about", "")
                    return blog;
                });
            
                for (const blog of completeBlogData) {
                    
                    const views = await PostView.find({post_id: blog._id}).lean().exec()
                    
                    if (user_id) {

                        const alreadySaved = await Saved.find({user: user_id, post: blog._id}).lean().exec()
                        blog.saved = alreadySaved.length > 0
                    }
                    
                    const likes = await PostLikes.find({post_id: blog._id}).lean().exec()
            
                    blog.likes = likes?.length
                    blog.viewCount = views.length
                }

                return res.status(200).json({message: "success", data: completeBlogData})
            }
            return res.status(200).json({message: "success", zero: true})
        }
        catch(e) {
            console.error("error in while getting same tags posts", e)
            return res.status(200).json({message: "success", zero: true})
        }
    }
)

router.get("/analytics_data", async (req, res) => {

    let user_id = req.user_id
    
    if (! user_id) return res.status(400).json({message: "invalid data provided"})


    try {

        // getting the user post and showing the analytics of the posts just

        let posts = await Post.find({author: user_id}).lean().exec()

        // analytics should show the date when it was commented with corresponding length

        // in here i should sort the data
        // TODO: get post comments and their dates in specific day and show the total with the same
        // day 

        let commentsSummary = []
        let totalLikesSummary = []
        let totalReadSummary = []

        if (posts.length) {
            
            posts = posts.map( post => {
                post.nameOfTheMonth = format(post.createdAt, "MMMM")
                return post
            })

            await Promise.all(
                
                posts.map( async post => {
                    
                    const views = await PostView.find({post_id: post._id}).sort({viewdAt: -1}).lean().exec()
                    
                    const likes = await PostLikes.find({post_id: post._id, likes: { $eq: 1}}).lean().exec()
                    
                    if (likes.length) {
                        totalLikesSummary.push(...likes)
                    }

                    let comments = await Comment.find({post: post._id}).sort({commentedOn: -1}).lean().exec()

                    if (comments.length) {
                        
                        comments = comments.map( comment => {

                            comment.comment.map( comm => {
                                
                                comm.nameOfTheMonth = format(comm.commentedOn, "MMMM")
                                
                                commentsSummary.push(
                                    comm
                                )

                                return comm
                            })
                            
                            return comment
                        })
                    }
                    totalReadSummary.push(...views)
                    return post 
                })
            )
            
            return res.status(200).json({message: "success", data: totalReadSummary, readerCount: totalReadSummary, commentCount: commentsSummary, likeCount: totalLikesSummary, posts})
        }
        return res.status(200).json({message: "success", zero: true})
    } 
    
    catch ( e ) {
        console.error("error while getting analytics data", e)
        return res.status(200).json({message: "failed"})
    }
})

router.post(
    "/update_post",
    
    body('user_id').trim().isMongoId().escape(),
    body('content').notEmpty().escape(), 
    body('tagInputs').isArray(),
    body('post_id').isMongoId().escape(), 
    
    async (req, res) => 
    
    {
        const result = validationResult(req)

        if (! result.isEmpty()) return res.status(200).json({message: "invalid data provided", error: result.array()})
        
        let {content, user_id, tagInputs, post_id} = req.body;
        
        if (!user_id) return res.status(200).json({message: "user_id required"});
        
        else if (! tagInputs || tagInputs.every(value => value === '')) {
            return res.status(200).json({
                status: "failed",
                reason: "empty tags all"
            })
        }
    
        tagInputs = tagInputs.map(tag => tag.includes("#") ? tag :  `#${tag}`.toLowerCase())
        content = (JSON.parse(decodeURIComponent(content)))
        
        try {

            // now for updating the post
            await Post.updateOne({_id: post_id}, {
                title: content.split("\n")[0],
                body: content,
                tags: tagInputs,
            })
            return res.status(200).json({message: "success"})

        } 
        
        catch( e ) {
            console.error("while updating post", e)
            return res.status(200).json({message: "serverError"})
        }
    }
)

router.post(
    "/reset_password",
    body('email').isEmail().escape(), 
    async (req, res) => {

        const error = validationResult(req)

        if (! error.isEmpty()) return res.status(400).json({error: "invalid email", error: error.array()})
        
        let {email} = req.body

        try {
            
            const user = await SignedUpUser.findOne({email: email}).lean().exec()
            
            if (! user) return res.status(400).json({error: "account not found"})
            
            let transporter = nodemailer.createTransport({
                
                host: "smtp-relay.brevo.com",
                port: 587,
                auth: {
                    user: process.env.OUTLOOK_ACC,
                    pass: process.env.OUTLOOK_ACC_PASS
                }
            });

            const otp = Math.floor(100000 + Math.random() * 900000);

            const newOtp = new OTPModel({
                email,
                otp
            })

            const mailOptions = {
                
                from: process.env.OUTLOOK_ACC,
                to: email,
                subject: "Reset Password",
                text: `Use this verfication code to reset your password: ${otp}`
            }
            
            transporter.sendMail(mailOptions, (error, info) => {
                
                if (error) {
                    console.error("error while sending email => ", error)
                    return res.status(400).json({error: "Server error, try again later"})
                }
                
                else {
                    console.log("email sent successfully")
                    newOtp.save()
                    return res.status(200).json({message: "success"})
                }
            })
        }
        catch(e) {
            console.error("while resetting password", e)
            return res.status(400).json({error: "Server error, try again later"})
        }

    }
)

router.post(
    "/verify_otp",
    body('email').isEmail().escape(), 
    body('otp').isNumeric().escape(), 
    body('password').isLength({min: 6}),
    async (req, res) => 
    {
        const error = validationResult(req)

        if (! error.isEmpty()) return res.status(400).json({error: "invalid email", error: error.array()})
    
        let {email, otp, password} = req.body
        
        console.log(email, otp, password)

        try {   
            
            const user = await SignedUpUser.findOne({email: email}).lean().exec()
            
            if (! user) return res.status(400).json({error: "account not found"})
            
            const otpData = await OTPModel.findOne({email: email}).lean().exec()
            
            if (! otpData) return res.status(400).json({error: "invalid otp provided"})
            
            if (otpData.otp !== otp) return res.status(400).json({error: "invalid otp"})
            
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            
            await SignedUpUser.updateOne({email: email}, {
                password: hashedPassword
            })
            
            await OTPModel.deleteOne({email: email})
            return res.status(200).json({message: "Your password was reset."})
            
        }
        catch(e) {
            console.error("while resetting password", e)
            return res.status(400).json({error: "Server error, try again later"})
        }
    }
)

router.post(
    "/verify_signup",
    body('email').isEmail().escape(), 
    body('otp').isNumeric().escape(), 
    async (req, res) => 
    {
        const error = validationResult(req)

        if (! error.isEmpty()) return res.status(400).json({error: "invalid email", error: error.array()})
    
        let {email, otp} = req.body
        
        console.log(email, otp)

        try {
            const user = await SignedUpUser.findOne({email: email}).lean().exec()
            
            if (! user) return res.status(400).json({error: "account not found"})
            
            const otpData = await OTPModel.findOne({email: email}).lean().exec()
            
            if (! otpData) return res.status(400).json({error: "invalid otp provided"})
            
            if (otpData.otp !== otp) return res.status(400).json({error: "invalid otp provided"})

            await SignedUpUser.findOneAndUpdate({email: email}, {
                isAccountConfirmed: true
            })

            await OTPModel.deleteOne({email: email})

            return res.status(200).json({message: "Welcome Your account is now confirmed"})
        } 
        
        catch( e ) {
            console.error("while verifying account", e)
            return res.status(500).json({error: "Server error, try again later"})
        }

    }
)

router.get(
    "/get_likers",
    query("post_id").isMongoId(), 
    async (req, res) => {

    try {
        let {post_id} = req.query

        let postLikers = await PostLikes.find({post_id}).lean().exec()
        let likersData = []

        await Promise.all(
            
            postLikers.map( async (post) => {
                
                let likerInfo = await SignedUpUser.findById(post.liker).lean().exec()
                
                if (likerInfo) {

                    delete likerInfo.password
                    likersData.push(
                        {
                            ...likerInfo,
                            likeDistance: formatDistanceToNowStrict((post.likedAt), {addSuffix: true}).replace("about", ""),
                            date: post.likedAt
                        }
                    )
                }
            })
        )
        
        likersData = likersData.sort( (a, b) => new Date(b.date) - new Date(a.date))
        return res.status(200).json({data: likersData})

    } catch( e ) {
        console.error("failed to get likers: ", e)
        return res.status(500).json({error: "Server error, try again later"})
    }
})
module.exports = router 