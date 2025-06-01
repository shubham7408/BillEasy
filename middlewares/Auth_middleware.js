const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const headers = req.headers["authorization"];
        const token = headers && headers.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            });
        }
        req.userInfo = decoded;
        console.log("User authenticated:", req.userInfo);
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({
            success: false,
            message: "Authentication failed",
            error: error.message
        });
    }
}


module.exports = authMiddleware;


