const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: {type: String, required: true },
    bio: { type: String, required: false},
    portraitURL: { type: String, required: false}
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;