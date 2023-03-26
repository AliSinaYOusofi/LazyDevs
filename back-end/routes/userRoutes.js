const router = require("express").Router();


router.post("/signup", async (req, res) => {
    res.status(200).send({message: "youtube | Blogger | Programmer"});
});



module.exports = router; // to special object