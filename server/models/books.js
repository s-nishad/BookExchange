const mongoose = require('./db.js');
const Schema = require('mongoose').Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        min: 3,
        max: 100,
    },
    author: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Users'
    },
})

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;