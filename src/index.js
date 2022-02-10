const express = require('express');
const bodyParser=require('body-parser');
const { middlewareSecurity }=require('../middlewares/middlewareSecurity');

// import routes
const records = require('./../routes/records');
const users =require('./../routes/users');
const orders= require('./../routes/orders');
const error =require('./../routes/error');

const app=express();
const port=3000;

app.use(bodyParser.urlencoded( { extended:true }) );
app.use(bodyParser.json());
app.use(express.json());

// middleware func as cors
app.use(middlewareSecurity());

//  routers
app.use('/records', records);
app.use('/users', users);
app.use('/orders', orders);
app.use('*', error);

app.listen(port, () => 
{
    console.log(`Server running in port:${port} `);
});
