const { getAllBooks, getBookById, createBook, updateBook } = require("../controllers/Book_controller.js");
const express = require("express");
const router = express.Router();

router.get("/getBooks", getAllBooks);
router.get("/getBook/:id", getBookById);

router.post("/createBook", createBook);

router.put("/updateBook/:id", updateBook);

module.exports = router;