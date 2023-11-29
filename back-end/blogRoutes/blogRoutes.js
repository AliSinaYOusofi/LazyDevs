const router = require("express").Router()
const Post = require("../models/Blogs")
const SignedUpUser = require("../models/Register")
const Comment = require("../models/Comments")
const Likes = require("../models/postLikes")
const PostView = require("../models/PostViews")
const { formatDistanceToNow, formatDistanceToNowStrict, differenceInDays, subDays } = require("date-fns");
const Comments = require("../models/Comments")
const replyComments = require("../models/ReplyComments")
const Saved = require("../models/PostsSavedToAccount")
const json = require("jsonwebtoken");
const FollowingUser = require("../models/FollowingUsers")
const { body, validationResult, query } = require("express-validator")

router.get("/newsfeed", async (req, res) => {
    
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
                if (user_id) {
                    const alreadySaved = await Saved.find({user: user_id, post: blog._id}).lean().exec()
                    blog.saved = alreadySaved.length > 0
                }
                blog.viewCount = views.length
                blog.commentCount = blog.comments.length
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
    let {user_id} = req.user_id
    
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
    body('author').notEmpty().isEmail().escape(), 
    body('comment').notEmpty().escape(), 
    async (req, res) => 
    
    {
        const result = validationResult(req)
        if (! result.isEmpty()) return res.status(400).json({message: "invalid post_id", error: result.array()})
        
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
        console.log(post_id, ' post_id')
        
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


router.get(
    "/get_likes_comments_count",
    query('post_id').notEmpty().isMongoId().escape(), 
    async (req, res) => 
    
    {
        const result = validationResult(req)
        if (! result.isEmpty()) return res.status(400).json({message: "invalid post_id"})

        let {post_id} = req.query;     

        if (post_id) {

            let post_likes = await PostView.find({'post_id': post_id}).lean().exec();
            let commentCount = await Comment.find({'post': post_id}).lean().exec();
            
            if (post_likes) {
                return res.status(200).json({status: "success", likeCount: post_likes, commentCount})
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

        try {
            const blogExists = await Post.findById(post_id).lean().exec()

            if (blogExists) {

                // deleting the blog from the database
                await Post.findByIdAndRemove(post_id)
                await Comment.deleteMany({ post: post_id })
                await Likes.deleteMany({ post_id })
                await PostView.deleteMany({ post_id })
                await replyComments.deleteMany({ post_id })

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
                blog.viewCount = views.length
                blog.commentCount = blog.comments.length
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
                            isFollowing: isUserFollowingThisUser ? true : false
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
        
        if (following.follows.length) {
            
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
                            isFollowing: isUserFollowingThisUser ? true : false
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
                                isFollowing: isUserFollowingThisUser ? true : false
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
            
            if (following.follows.length) {
                
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
                                isFollowing: isUserFollowingThisUser ? true : false
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
module.exports = router