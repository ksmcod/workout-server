const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

function createToken(_id) {
    return jwt.sign({ _id },process.env.SECRET,{ expiresIn: '3d'});
}

// CONTROLLER FUNCTIONS
// login user
async function loginUser(req,res) {
    const { email, password } = req.body;
    
    try {
        const user = await User.login(email, password);

        // create token
        const token = createToken();
        res.status(200).json({user, token});
    } catch(err) {
        res.statu(400).json({ error:err.message });
    }
}

// signup user
async function signupUser(req,res) {
    const { email, password } = req.body;

    try {
        const user = await User.signup(email, password);

        // create token
        const token = createToken();
        res.status(201).json({user, token});
    } catch(err) {
        res.status(400).json({ error:err.message });
    }
}

module.exports = { signupUser, loginUser };