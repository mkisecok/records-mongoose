require('dotenv').config();

const express = require('express');
const bodyParser=require('body-parser');
const mongoose =require('mongoose');
const { middlewareSecurity }=require('./middlewares/middlewareSecurity');
const morgan = require('morgan');

// import routes
const records = require('./routes/records');
const users =require('./routes/users');
const orders= require('./routes/orders');

const app=express();
const databaseURL=`${ process.env.DB_URL }/${ process.env.DB_NAME }`;
const port=process.env.PORT;

const db = mongoose.connect(databaseURL);

app.use(bodyParser.urlencoded( { extended:true }) );
app.use(bodyParser.json());
app.use(express.json());

// middleware func as cors
app.use(middlewareSecurity());

app.use(morgan('tiny'));

//  routers
app.use('/records', records);
app.use('/users', users);
app.use('/orders', orders);

// Error middleware
app.use('*', (req, res, next ) =>
{
    let myError = new Error('This path does not exist');
    myError.statusCode=404;
    next(myError);
});

app.use((error, req, res, next) =>
{
    console.log('Created error handler ', error );
    res.status(error.statusCode);
    res.send({ 
        error: 
            {
                status:error.statusCode,
                message:error.message
            } 
    });
});

app.listen(port, () => 
{
    console.log(`Server running in port:${port} `);
});
