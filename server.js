// Require Libraries
const express = require('express');
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv/config')

// App Setup
const app = express();
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}





//Import Routing
const factsRoute = require('./routes/facts');
const authRoute = require('./routes/auth');

// Middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use('/facts', factsRoute);
app.use('/user', authRoute);

app.get('/', (req,res) => {
    res.send("Welcome to Amazing Facts API !")
});

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
app.listen(port, () => {
    console.log(`Amazing Facts Api running on localhost:${port}`);
});