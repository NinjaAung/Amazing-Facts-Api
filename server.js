// Require Libraries
const express = require('express');
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv/config')

// App Setup
const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
const PORT = 3000





//Import Routing
const postsRoute = require('./routes/posts');


// Middleware
app.use('/posts', postsRoute);


app.use(function(req, res, next) {
    const doc = null;
    return res.status(404).send(`Route doesn't exist. Please refer to ${doc}`); //error
});


// Connect DB
mongoose.connect(process.env.MONGODB_URL, 
    { useNewUrlParser: true },
    () => console.log('Connected to DB')
)

// Start Server
app.listen(PORT, () => {
    console.log(`Amazing Facts Api running on localhost:${PORT}`);
});