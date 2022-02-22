const { Schema, model } =require('mongoose');

const orderSchema = new Schema({
    productId: { type:String, trim:true },
    quantity: Number
},
{ timestamps:true });

const orderModel = new model('Order', orderSchema, 'orders');

module.exports = orderModel; 
