const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./blogRoutes/blogRoutes")
const accountRoutes = require("./routes/accountRoutes")
const { getDB } = require("./db_connection/mongoose.db.config");

require("dotenv").config();
app.use(cors({
    origin: "http://localhost:3000", 
    methods: ["GET", "POST", "DELETE"],
    credentials: true, // allows us to use cookies or authorization tokens
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Headers', 'Access-Control-Allow-Methods']
}));

app.use(express.urlencoded({extended: true})); // extract data from the req body and add to request object


app.use(express.json()); // convert data from request body to js object.
app.use(cookieParser());




// middleware to check if token is expired
// if the token is expired we will
// generate another token using the refresh token
// if re-fresh token is expired then redirect the user
// back to login page.

// middlwares should be before router handlers
// or it will never get called.
app.use((req, res, next) => {

    // to handle the no current logged in user_id
    const {accessToken = null, refreshToken = null} = req.cookies
    
    // this part of the code must redirect user if there is no cookie
    // if (! accessToken || ! refreshToken) {
    //     return res.redirect(302, "http://localhost:3000/login")
    // }

    const verifyAccessToken = jwt.verify(accessToken, process.env.JWT_SECRET)
    const verifyRefreshToken  = jwt.verify(refreshToken, process.env.JWT_SECRET)

    console.log(verifyAccessToken, 'verfiy ')
    if (verifyAccessToken) {
        req.user_id = verifyAccessToken._id
        console.log('access token is okay: ', req.user_id)
        next()
    } 
    
    else if (verifyRefreshToken) {
        req.user_id = verifyRefreshToken.user_id
        console.log('refresh token is okay: ', req.user_id)
        next() 
    }
    else {
        next()
    }
});

app.use( async (req, res, next) => {
    await getDB()
    next()
})

app.use("/user", userRoutes);
app.use("/blogRoutes", blogRoutes)
app.use('/accountRoutes', accountRoutes)
app.listen(process.env.PORT, () => console.log("Started at: %s", new Date().toTimeString()));