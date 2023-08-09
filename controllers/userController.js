const User = require('../models/userModel');

// login user
async function loginUser(req,res) {
    console.log(req.body);
    res.json({ msg: 'Login user' });
}

// signup user
async function signupUser(req,res) {
    console.log(req.body);
    const { email, password } = req.body;

    try {
        const user = await User.signup(email, password);
        res.status(201).json(user);
    } catch(err) {
        res.status(400).json({ msg:err.message });
    }
}

module.exports = { signupUser, loginUser };