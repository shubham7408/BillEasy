const Author = require("../models/Author.js");

async function getAllAuthors(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const authors = await Author.find({})
            .skip(skip)
            .limit(limit)
            .exec();

        const total = await Author.countDocuments();

        return res.status(200).json({
            success: true,
            message: "Authors retrieved successfully",
            data: authors,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
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

async function createAuthor(req, res) {
    try {
        const newBook = await Author.create(req.body);
        return res.status(201).json({
            success: true,
            message: "Author created successfully",
            data: newBook
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
    getAllAuthors,
    createAuthor
};

