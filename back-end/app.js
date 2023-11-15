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
// app.use((req, res, next) => {
    
//     const accessToken = req.cookies.accessToken;
//     const refreshToken = req.cookies.refreshToken;

//     const safeRoutes = ["/user/check_user_login", "/user/save_user", "/user/save_post"]
//     console.log(req.path, safeRoutes.includes(req.path))
//     if (safeRoutes.includes(req.path)) return next();

//     jwt.verify(accessToken, process.env.JWT_SECRET, (error) => {
//         if (error) {
//             jwt.verify(refreshToken, process.env.JWT_SECRET, (error, decoded) => {
//                 if(error) return res.status(200).json("refreshTokenInvalid");
//                 const newAccessToken = jwt.sign(decoded, process.env.JWT_SECRET, {expiresIn: "15m"});
//                 res.cookie('accessToken', newAccessToken, {maxAge: 900000, sameSite: "Lax"});
//                 next();
//             })
//         }
//         next();
//     })

// });

app.use( async (req, res, next) => {
    await getDB()
    next()
})

app.use("/user", userRoutes);
app.use("/blogRoutes", blogRoutes)
app.use('/accountRoutes', accountRoutes)
app.listen(process.env.PORT, () => console.log("Started at: %s", new Date().toTimeString()));