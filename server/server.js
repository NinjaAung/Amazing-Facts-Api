// Require Libraries
const express = require('express');


// App Setup
const app = express();
const PORT = 3000


// Middleware

// Routes
app.get('/', (req, res) => {
    // Handle the home page when we haven't queried yet
    res.send('hello')
})
app.get('/greetings/:name', (req, res) => {
    const name = req.params.name;
    res.send(`hello ${name}`);
})

app.use(function(req, res, next) {
    const Documentaion = null;
    res.status(404).send(`Route doesn't exist. Please refer to ${Documentaion}`);
});

// Start Server

app.listen(PORT, () => {
    console.log(`Amazing Facts Api running on localhost:${PORT}`);
});