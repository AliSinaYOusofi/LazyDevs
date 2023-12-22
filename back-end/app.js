const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./blogRoutes/blogRoutes")
const accountRoutes = require("./routes/accountRoutes")
const {getDBInstance} = require("./db_connection/InitializeConnection");
const { cookie, validationResult } = require("express-validator");
require("dotenv").config();
app.use(cors({
    origin: "http://localhost:3000", 
    methods: ["GET", "POST", "DELETE", "PUT"],
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



app.use(
    // cookie('accessToken').notEmpty().isJWT().escape(),
    // cookie('refreshToken').notEmpty().isJWT().escape(),
    (req, res, next) => 
    {
        console.log(req.path)
        
        const saveRoutes = ['/user/save_user', '/user/check_user_login', '/blogRoutes/reset_password', '/blogRoutes/verify_otp', '/blogRoutes/verify_signup']
        
        if (saveRoutes.includes(req.path)) return next()
        
        // const result = validationResult(req)
        // if (! result.isEmpty()) return res.status(400).json({message: "invalid cookies", error: result.array()})
        
        
        const {accessToken = null, refreshToken = null} = req.cookies

        if (!accessToken && ! refreshToken) {

            console.log('no access || refresh token provided')
            console.log(req.path, req.cookies)
            return res.status(302).json({redirectTo: "/login"})
        }
        
        // if access token is expired then check the refresh token
        // and if refresh token is valid then make a new access token and add it in the cookies
        
        try {

            if (accessToken) {
                const verifyAccessToken = jwt.verify(accessToken, process.env.JWT_SECRET)
                req.user_id = verifyAccessToken._id
                console.log('access token is okay: ', req.user_id)
                next()
            } 
            
            else if (refreshToken) {
    
                console.log(refreshToken, 'on refresh token')
                let verifyRefreshToken  = jwt.verify(refreshToken, process.env.JWT_SECRET)

                req.user_id = verifyRefreshToken.user_id
    
                delete verifyRefreshToken.iat
                delete verifyRefreshToken.exp
                
                const newAccessToken = jwt.sign(verifyRefreshToken, process.env.JWT_SECRET, {expiresIn: "1d"});
                
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
        } 
        
        catch(e) {
            console.error(e, 'while verifying tokens')
            return res.status(302).json({redirectTo: "/login"})
        }
    }
);

app.use(async (req, res, next) => 
    
    {
    
        try {
            await getDBInstance();
            next();
        } 
        catch (error) {
            console.error('Error initializing database:', error);
            res.status(500).send('Internal Server Error');
        }
    }
);


app.use("/user", userRoutes);
app.use("/blogRoutes", blogRoutes)
app.use('/accountRoutes', accountRoutes)
app.listen(process.env.PORT, () => console.log("Started at: %s", new Date().toTimeString()));