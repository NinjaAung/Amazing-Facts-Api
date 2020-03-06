const mongoose = require('mongoose');


const PostSchema = mongoose.Schema({
    fact: {
        type: String,
        requires: true
        },
    data: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Posts', PostSchema)