const mongoose = require("mongoose");

async function connectDB() {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
        console.warn("⚠️  MONGODB_URI environment variable is not defined.");
        return null; // Gracefully return instead of crashing
    }

    try {
        const connect = await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("✅ Database connected successfully");
        return connect;
    } catch (error) {
        console.error("❌ MongoDB connection error:", error.message);
        console.warn("⚠️  Failed to connect to the database.");
        return null; // Avoid crashing the app
    }
}

module.exports = connectDB;
