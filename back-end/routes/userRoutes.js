const router = require("express").Router();
const { getDB } = require("../db_connection/mongoose.db.config");
const SignedUpUser = require("../models/Register");

router.post("/save_user", async (req, res) => {
    
    const {
        username,
        fullName,
        password,
        email,
        profileUrl
    } = req.body;

    const userInfo = { username, fullName, password, email, profileUrl };

    console.log(username, fullName, password, email, profileUrl, 'what is going on');
    console.log(req.body);

    const db = await getDB();

    try {
        
        let newUserData = new SignedUpUser(userInfo);
        
        newUserData.save( error => {
            
            if (error) {
                console.error(error, "while saving. in save()");
                return res.status(500).send("serverError");
            }

            return res.status(200).send("UserSaved");
        });
    }catch(error) {
        console.log(error, "error while saving data");
    }
    res.status(200).send({message: "youtube | Blogger | Programmer"});
});



module.exports = router; // to special object