const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const connectDB = require("./config/db.js");
const erorrMiddleware = require("./middlewares/errorMiddleware.js");
const PORT = process.env.PORT || 3000;

app.use(erorrMiddleware);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    res.status(200).json({
        message: "Welcome to the API",
        status: "success"
    });
});

app.get("/about", async (req, res) => {
    res.status(200).json({
        message: "API is About",
        status: "success"
    });
})


connectDB().then(app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
}));