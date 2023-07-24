const express = require('express');
const router = express.Router();
const { createWorkout,
        getWorkout,
        getWorkouts
 } = require('../controllers/workoutController');
const Workout = require('../models/workoutModel');

// GET all workouts
router.get('/',getWorkouts);

// GET a single workout
router.get('/:id',getWorkout);

// POST a new workout
router.post('/',createWorkout);

// DELETE a workout
router.delete('/:id',(req,res) => {
    res.json({ message: 'DELETE a workout!' });
});

// UPDATE  a workout
router.patch('/:id',(req,res) => {
    res.json({ message: 'UPDATE a workout!' });
})

module.exports = router;