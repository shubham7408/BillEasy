const { getAllBooks, getBookById, createBook, updateBook, DeleteBook } = require("../controllers/Book_controller.js");
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/Auth_middleware.js");

// Apply authentication middleware to all routes in this router
router.use(authMiddleware);

router.get("/getBooks", getAllBooks);
router.get("/getBook/:id", getBookById);

router.post("/createBook", createBook);

router.put("/updateBook/:id", updateBook);
router.delete("/deleteBook/:id", DeleteBook);

module.exports = router;