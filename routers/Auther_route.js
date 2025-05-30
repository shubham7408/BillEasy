const { getAllAuthors, createAuthor } = require("../controllers/AutherController.js");
const express = require("express");
const router = express.Router();

router.get("/", getAllAuthors);
router.post("/create", createAuthor);

module.exports = router;