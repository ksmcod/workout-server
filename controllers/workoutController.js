const Workout = require('../models/workoutModel');
const mongoose = require('mongoose')

// GET all workouts
async function getWorkouts(req,res) {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });

    res.status(200).json(workouts);
}

// GET a single workout
async function getWorkout(req,res) {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such workout!" });
    }
     
    const workout = await Workout.findById(id);

    if(!workout) {
        return res.status(404).json({ error: "No such workout!"});
    }

    res.status(200).json(workout);
}

// CREATE a new workout
async function createWorkout(req,res) {
    const { title, reps, load } = req.body;

    try{
        const workout = await Workout.create({ title, reps, load });
        res.status(200).json(workout);
    } catch(err) {
        res.status(400).json({ error: err.message });
    }
}

// DELETE a workout


// UPDATE a workout

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout
};