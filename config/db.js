const mongoose = require("mongoose");
const erorrMiddleware = require("../middlewares/errorMiddleware.js");

async function connectDB() {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
        erorrMiddleware(new Error("MONGODB_URI is not defined"), null, null, null);
        console.error("❌ MONGODB_URI is not defined in the environment variables.");
        return null;
    }
    try {
        const connect = await mongoose.connect(mongoUri);
        console.log("✅ Database connected successfully");
        return connect;
    } catch (error) {
        erorrMiddleware(error, null, null, null);
        console.error("❌ Database connection failed:", error.message);
        return null;
    }
}

module.exports = connectDB;
