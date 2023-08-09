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

// static method on the schema
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


const userModel = mongoose.model('User',userSchema);

module.exports = userModel;
