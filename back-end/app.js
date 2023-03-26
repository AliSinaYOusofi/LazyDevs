const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

app.use(express.urlencoded({extended: true})); // extract data from the req body and add to request object
app.use(cors({})); // allow cors
app.use(express.json()); // convert data from request body to js object.

 
app.use("/user", userRoutes);
app.listen(process.env.PORT, () => console.log("Started at: %s", new Date().toTimeString()));