
require('dotenv').config();

const crypto = require('crypto');

const { Schema, model } =require('mongoose');
const userAdress =require('./UserAdress');

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: { type: String },
    adress:userAdress
},
{ timestamps:true });

userSchema.methods.hashPassword = (password) =>
{
    const secret = process.env.SECRET_KEY;
    const hash = crypto.createHmac('sha256', secret).update(password).digest('hex');

    return hash;
};

const userModel= new model('User', userSchema, 'users');

module.exports = userModel;
