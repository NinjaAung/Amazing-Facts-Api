const mongoose = require('mongoose');


const factSchema = mongoose.Schema({
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
    },
    versionKey: false
});

module.exports = mongoose.model('Facts', factSchema);