const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const connectDB = require("./config/db.js");
const bookRouter = require("./routers/Book_route.js");
const authorRouter = require("./routers/Auther_route.js");
const userRouter = require("./routers/User_route.js");
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
});

app.use("/api/books", bookRouter);
app.use("/api/authors", authorRouter);
app.use("/api/users", userRouter);

connectDB().then(app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
}));