const mongoose = require("mongoose");
require("dotenv").config();

async function connectToCluster () {
    
    const options = {
        useNewUrlParser: true, // old ulr purser would be deprecated
        useUnifiedTopology: true, // better performence 
    };
    
    try {
        await mongoose.connect(process.env.MONGO_AUTH, options);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw new Error("Error Connecting to Mongo Cluster");
    }
}

// using singelton pattern which ensures to that it returns the same instance
// and ensures that a single object is shared accross the application.

let db;

const getDB = async () => {
    if (!db) {
        await connectToCluster();
        db = mongoose.connection;
    }

    return db;
}

module.exports = {
    getDB,
};