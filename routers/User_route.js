const { registerUser, getAllUsers, LoginUser } = require("../controllers/User_Controller.js");
const express = require("express");
const router = express.Router();

router.post("/register", registerUser);

router.get("/", getAllUsers);

router.post("/login", LoginUser);

module.exports = router;