const mongoose = require('mongoose');


const PostSchema = mongoose.Schema({
    fact: {
        type: String,
        requires: true
        },
    author: {
        type: String,
        requires: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Posts', PostSchema);