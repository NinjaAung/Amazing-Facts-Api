// Require Libraries
require('dotenv').config();
const express = require('express');
const bodyparser = require("body-parser");


// Mongo Database
require('dotenv').config();
require('./db/amazing-facts-api-db.js');
const Post = require('./models/post');


// App Setup
const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
const PORT = 3000




// Middleware

// GET 
app.get('/', (req, res) => {
    // Handle the home page when we haven't queried yet
    return res.send('hello');
});

app.get('/facts', (req, res) => {
    const post = new Post(req.body);
    return res.send(`${post}`)
});

// POST
app.post('/facts/new', (req, res) => {
    const post = new Post(req.body);
    post.save((err, post) => {
        return res.send('Fact added');
    });
});

// DEL
app.delete('/delete', (req, res) => {
    return res.send('Fact deleted')
});

app.use(function(req, res, next) {
    const doc = null;
    return res.status(404).send(`Route doesn't exist. Please refer to ${doc}`);
});




// Start Server

app.listen(PORT, () => {
    console.log(`Amazing Facts Api running on localhost:${PORT}`);
});