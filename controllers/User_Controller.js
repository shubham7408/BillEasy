const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const bcrypt = require("bcrypt");

async function registerUser(req, res) {
    try {
        const { username, password, email } = req.body;
        if (!username || !password || !email) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        const existingUser = await User.find({ $or: [{ username }, { email }] });
        if (existingUser.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Username or email already exists"
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            password: hashedPassword,
            email
        });
        await newUser.save();
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

async function LoginUser(req, res) {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username and Password are required"
            });
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        };
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            });
        }
        const accessToken = jwt.sign({
            id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin
        }, process.env.JWT_SECRET, { expiresIn: "15m" });
        return res.status(200).json({
            success: true,
            message: "Login successful",
            accessToken,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Erorr",
            error: error.message
        });
    }
}

async function getAllUsers(req, res) {
    try {
        const users = await User.find({}, '-password'); // Exclude password from the response
        return res.status(200).json({
            success: true,
            users
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

module.exports = {
    registerUser,
    getAllUsers,
    LoginUser
};