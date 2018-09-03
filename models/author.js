const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    firstName: { type: String, required: [true, "Author's first name required"] },
    lastName: {type: String, required: [true, "Author's last name required"]},
    bio: { type: String, required: false},
    portraitURL: { type: String, required: false},
    books: { type: Array, default: [], required: false }
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;