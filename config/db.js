const mongoose = require("mongoose");

async function connectDB() {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        if (connect) {
            console.log("Database connected successfully");
        }
        return connect;
    } catch (error) {
        console.error(error);
        console.warn("Failed to connect Database");
        process.exit(1);
    }
}

module.exports = connectDB;