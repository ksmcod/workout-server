const express = require('express');
require('dotenv').config();
const workoutRoutes = require('./routes/workoutRoutes');

const port = process.env.PORT || 3000;

// express app
const app = express();

// middleware
app.use((req, res, next) => {
    console.log( req.method, req.path);
    next();
});

// routes
app.use('/api/workouts',workoutRoutes);

// listen for requests
app.listen(port,() => {
    console.log(`Listening on port ${port}`);
})