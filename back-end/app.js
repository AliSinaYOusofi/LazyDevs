const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");

require("dotenv").config();

app.use(express.urlencoded({extended: true})); // extract data from the req body and add to request object

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true, // allows us to use cookies or authorization tokens
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); // convert data from request body to js object.
app.use(cookieParser());
 
app.use("/user", userRoutes);
app.listen(process.env.PORT, () => console.log("Started at: %s", new Date().toTimeString()));