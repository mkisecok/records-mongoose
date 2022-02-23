const { Schema, model } =require('mongoose');

const adressSchema= new Schema({
    zip: String,
    street: String,
    state: String,
    city: String
}, { _id:false });
const userAdress = new model ( 'UserAdress', adressSchema, 'userAdress');

module.exports = adressSchema;
