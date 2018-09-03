const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: { type: String, required: [true, "Title Required"] },
    bookGenre: { type: String, required: false },
    bookDescription: { type: String, required: false},
    bookCoverURL: { type: String, required: false},
    authors: { type: Array, default: [], required: false }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;