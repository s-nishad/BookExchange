const Schema = require('mongoose').Schema;
const mongoose = require('./db.js');

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    department: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,

    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
