const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workoutRoutes');

const port = process.env.PORT || 3000;

// express app
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log( req.method, req.path);
    next();
});

// routes
app.use('/api/workouts',workoutRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
 // listen for requests
    app.listen(port,() => {
        console.log(`Connected to db and listening on port ${port}`);
    })
})
.catch(err => {
    console.log(err);
});
