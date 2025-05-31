const Book = require("../models/Book.js");

async function getAllBooks(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const books = await Book.find({})
            .populate("author", "name age")
            .skip(skip)
            .limit(limit)
            .exec();

        const total = await Book.countDocuments();

        return res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
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

async function getBookById(req, res) {
    try {
        const bookId = req.params.id;
        const book = await Book.findById(bookId)
            .populate("author", "name age")
            .exec();
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: book
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

async function createBook(req, res) {
    try {
        const newBook = await Book.create(req.body);
        return res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: newBook
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internam Server Error",
            error: error.message
        });
    }
}

async function updateBook(req, res) {
    try {
        const bookId = req.params.id;
        const updateBook = await Book.findByIdAndUpdate(bookId, req.body, { new: true, runValidators: true });
        if (!updateBook) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: updateBook
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
    getAllBooks,
    getBookById,
    createBook,
    updateBook
};