const { Schema, model } =require('mongoose');

const userSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String
},
{ timestamps:true });

const userModel= new model('User', userSchema, 'users');

module.exports = userModel;
