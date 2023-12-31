const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workoutRoutes');
const userRoutes = require('./routes/userRoutes');

const port = process.env.PORT || 3000;

// express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());
// app.use((req, res, next) => {
//     console.log( req.method, req.path);
//     next();
// });

// routes
app.use('/api/workouts',workoutRoutes);
app.use('/api/user',userRoutes);

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
