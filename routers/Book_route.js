const { getAllBooks, getBookById, createBook, updateBook, DeleteBook } = require("../controllers/Book_controller.js");
const express = require("express");
const router = express.Router();

router.get("/getBooks", getAllBooks);
router.get("/getBook/:id", getBookById);

router.post("/createBook", createBook);

router.put("/updateBook/:id", updateBook);
router.delete("/deleteBook/:id", DeleteBook);

module.exports = router;