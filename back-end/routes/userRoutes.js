const router = require("express").Router();


router.post("/save_user", async (req, res) => {
    
    const {
        username,
        fullName,
        password,
        email,
        profileUrl
    } = req.body;

    console.log(username, fullName, password, email, profileUrl, 'what is going on');
    console.log(req.body);

    res.status(200).send({message: "youtube | Blogger | Programmer"});
});



module.exports = router; // to special object