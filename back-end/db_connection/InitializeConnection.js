const { connectToCluster } = require('./mongoose.db.config');
const mongoose = require("mongoose");

let dbInstance;

const getDBInstance = async () => {
    
    if (!dbInstance) {
        await connectToCluster();
        dbInstance = mongoose.connection;
    }

    return dbInstance;
};

module.exports = { getDBInstance };
