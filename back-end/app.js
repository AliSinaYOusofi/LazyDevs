const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./blogRoutes/blogRoutes")
const accountRoutes = require("./routes/accountRoutes")
const {getDBInstance} = require("./db_connection/InitializeConnection")
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

    console.log(req.path, req.cookies)
    const saveRoutes = ['/user/save_user', '/user/check_user_login']
    
    if (saveRoutes.includes(req.path)) return next()
    
    const {accessToken = null, refreshToken = null} = req.cookies

    if (!accessToken && ! refreshToken) {

        console.log('no access || refresh token provided')
        console.log(req.path, req.cookies)
        return res.status(302).json({redirectTo: "/login"})
    }

    const verifyAccessToken = jwt.verify(accessToken, process.env.JWT_SECRET)
    const verifyRefreshToken  = jwt.verify(refreshToken, process.env.JWT_SECRET)
    
    // if access token is expired then check the refresh token
    // and if refresh token is valid then make a new access token and add it in the cookies
    
    if (verifyAccessToken) {
        req.user_id = verifyAccessToken._id
        console.log('access token is okay: ', req.user_id)
        next()
    } 
    
    else if (verifyRefreshToken) {
        
        req.user_id = verifyRefreshToken.user_id
        const newAccessToken = jwt.sign(currentUserData, process.env.JWT_SECRET, {expiresIn: "1d"});
        
        // adding a new access token when refresh token is valid
        res.cookie('accessToken', newAccessToken, 
            {
                maxAge: 86400000, 
                sameSite: "Lax"
            }
        );

        console.log('sent a new access token')
        console.log('refresh token is okay: ', req.user_id, req.path)
        next() 
    } 
    
    // if no refresh token or access token then both are expired and must
    // login again
    else {
        return res.status(302).json({redirectTo: "/login"})
    }
});

app.use(async (req, res, next) => {
    try {
      await getDBInstance();
      next();
    } catch (error) {
      console.error('Error initializing database:', error);
      res.status(500).send('Internal Server Error');
    }
});


app.use("/user", userRoutes);
app.use("/blogRoutes", blogRoutes)
app.use('/accountRoutes', accountRoutes)
app.listen(process.env.PORT, () => console.log("Started at: %s", new Date().toTimeString()));