const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "Author",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    publishedYear: {
        type: Number,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    pages: {
        type: Number,
        required: true,
    },
    availableCopies: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

const Book = mongoose.model("Book", BookSchema);
module.exports = Book;
