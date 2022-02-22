const { Schema, model } =require('mongoose');

const recordSchema = new Schema({ 
    title:{ type:String, trim:true },
    artist: String,
    year: Number,
    price:Number
},
{ timestamps:true });

const recordModel= new model('Record', recordSchema, 'records');

module.exports = recordModel;
