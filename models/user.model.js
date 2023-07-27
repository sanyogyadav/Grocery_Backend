const mongoose = require('mongoose')

const bcrypt = require('bcryptjs')

const user = new mongoose.Schema({

    username: { type: String, required: true},
    email: { type: String, required: true},
    address: { type: String, required: true},
    pincode: { type: Number, required: true},
    password: { type: String, required: true},
    confirmPassword: { type: String, required: true},

}, { timestamps: true });

user.methods.encryptPassword = async password=>{
    const salt = await bcrypt.genSalt(5);
    const hash = await bcrypt.hash(password, salt);
    return hash
}

user.methods.validPassword = async function(checkPassword){
    const result = await bcrypt.compare(checkPassword, this.password)
    return result
}

const User = mongoose.model("User", user);
module.exports = User;