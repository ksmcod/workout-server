const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
userSchema.statics.signup = async (email, password) => {
    
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
