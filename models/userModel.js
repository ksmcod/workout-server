const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// STATIC METHOD for signup
userSchema.statics.signup = async function(email, password) {

    // email and password validation
    if(!email || !password) {
        throw Error('Please fill all the fields');
    }
    if(!validator.isEmail(email)) {
        throw Error('Please enter a valid email!')
    }
    if(!validator.isStrongPassword(password)) {
        // throw Error('Please enter a stronger password!');
    }

    const exists = await this.findOne({ email });

    if(exists) {
        throw Error('This email is already registered!');
    }
    
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);

    const user = await this.create({ email, password:hash });
    
    return user;
}

// STATIC METHOD for login
userSchema.statics.login = async function(email,password) {

    if(!email || !password) {
        throw Error('Please fill all the fields');
    }

    const user = await this.findOne({ email });
    if(!user) {
        throw Error('The email is incorrect!');
    }

    const match = await bcrypt.compare(password,user.password);

    if(!match) {
        throw Error('Password is incorrect!');
    }
    return user;
}


const userModel = mongoose.model('User',userSchema);

module.exports = userModel;
