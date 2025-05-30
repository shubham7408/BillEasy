const { getAllBooks, getBookById, createBook } = require("../controllers/Book_controller.js");
const express = require("express");
const router = express.Router();

router.get("/getBooks", getAllBooks);
router.get("/getBook/:id", getBookById);

router.post("/createBook", createBook);

module.exports = router;