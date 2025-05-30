const mongoose = require("mongoose");
const Scheam = mongoose.Schema;

const AuthorSchema = new Scheam({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
});

const Author = mongoose.model("Author", AuthorSchema);
module.exports = Author;