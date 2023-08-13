const Workout = require('../models/workoutModel');
const mongoose = require('mongoose')

// GET all workouts
async function getWorkouts(req,res) {
    const user_id = req.user._id;
    const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });

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
    const user_id = req.user._id;

    try{
        const workout = await Workout.create({ title, reps, load,user_id });
        res.status(200).json(workout);
    } catch(err) {
        res.status(400).json({ error: err.message });
    }
}

// DELETE a workout
async function deleteWorkout(req,res) {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such workout!" });
    }

    const workout = await Workout.findByIdAndDelete(id);

    if(!workout) {
        return res.status(404).json({ error: "No such workout!" });
    }

    res.status(200).json(workout);
}

// UPDATE a workout
async function updateWorkout(req,res) {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such workout!" });
    }

    const workout = await Workout.findByIdAndUpdate(id,{
        ...req.body
    });

    if(!workout) {
        return res.status(404).json({ error: "No such workout!" });
    }

    res.status(200).json(workout);
}


module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
};