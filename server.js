const express = require('express');
require('dotenv').config();

const port = process.env.PORT || 3000;

// express app
const app = express();

// middleware
app.use((req, res, next) => {
    console.log( req.method, req.path);
    next();
});

// routes
app.get('/',(req,res) => {
    res.json({ message: 'Welcome to the app!'});
});

// listen for requests
app.listen(port,() => {
    console.log(`Listening on port ${port}`);
})