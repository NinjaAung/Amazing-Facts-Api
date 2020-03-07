const mongoose = require('mongoose');


const factSchema = mongoose.Schema({
    fact: String,
    user: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Facts', factSchema);