const { registerUser, getAllUsers } = require("../controllers/User_Controller.js");
const express = require("express");
const router = express.Router();

router.post("/register", registerUser);

router.get("/", getAllUsers);

module.exports = router;