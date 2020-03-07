const mongoose = require('mongoose');


const factSchema = mongoose.Schema({
    fact: {
        type: String,
        require: true
        },
    user: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    versionKey: false
});

module.exports = mongoose.model('Facts', factSchema);