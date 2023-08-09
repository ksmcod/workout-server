const User = require('../models/userModel');

// login user
async function loginUser(req,res) {
    console.log(req.body);
    res.json({ msg: 'Login user' });
}

// signup user
async function signupUser(req,res) {
    console.log(req.body);
    res.json({ msg: 'Signup user' });
}

module.exports = { signupUser, loginUser };