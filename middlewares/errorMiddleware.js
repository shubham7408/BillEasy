const erorrMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
        status: "error"
    });
    next();
}

module.exports = erorrMiddleware;