// login user
async function loginUser(req,res) {
    res.json({ msg: 'Login user' });
}

// signup user
async function signupUser(req,res) {
    res.json({ msg: 'Signup user' });
}

module.exports = { signupUser, loginUser };