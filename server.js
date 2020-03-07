// Require Libraries
const express = require('express');
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv/config')

// App Setup
const app = express();
const PORT = 3000





//Import Routing
const factsRoute = require('./routes/facts');
const userRoute = require('./routes/user');

// Middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use('/facts', factsRoute);
app.use('/user', userRoute);



app.use(function(req, res, next) {
    const doc = null;
    return res.status(404).send(`Route doesn't exist or Wrong Method has been used. Please refer to ${doc}`); //error
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