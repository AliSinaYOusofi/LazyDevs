const Post = require("../models/Blogs");
const PostView = require("../models/PostViews");

const router = require("express").Router();


// get account credentials
router.get("/my_posts/:author", async (req, res) => {

    let {author} = req.params;

    if (!author) return res.status(200).json({message : "no author id provied"})

    author = String(author).split(":")[1];

    try {
        const Posts = await Post.find({author}).lean().exec()

        console.log(Posts)
        for (let post of Posts) {
            const views = await PostView.find({post_id: post._id}).lean().exec()
            post.viewCount = views.length
        }

        console.log("final of single user post", Posts)

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




module.exports = router