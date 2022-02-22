
const path = require('path');

// model
const Order = require('../models/Order');

// chance
const Chance = require('chance');
const chance = new Chance();

const getController= ((req, res) => 
{   
    Order.find({})
        .then((orders) => 
        {
            res.status(200).sendFile(path.join(__dirname, '../../public/index.html'));
        })
        .catch(err => 
        {
            res.status(400).json({
                success:false,
                message: err.message
            });
        });      

});

const postController = ((req, res) =>
{
    newOrder = new Order();

    newOrder.productId = req.body.productId || chance.hash({ length: 6 });
    newOrder.quantity = req.body.quantity || chance.integer({ min: 1, max: 100 });

    newOrder.save(( err, order ) => 
    {
        if(err) throw err;
        res.json(order);
    });
        
});

const getParamController = ( (req, res) => 
{
    const { id } = req.params;

    Order.find({ _id: id } )
        .then(order => 
        {
            res.status(200).json({
                success:true,
                data:order
            });
        })
        .catch(err => 
        {
            res.status(400).json({
                success:false,
                message:err.message
            });
        });
});

const putParamController = ( (req, res) => 
{
    const { id } = req.params;

    Order.findOne({ _id: id })
        .then((order) => 
        {
            order.quantity = req.body.quantity || order.quantity;
            order.productId =req.body.productId || order.productId;

            order.save()
                .then((updatedOrder) => 
                {
                    res.status(200).json({
                        success:true,
                        newData: req.body,
                        data:updatedOrder
                    });
                })
                .catch(err => 
                {
                    res.status(400).json({
                        success:false,
                        message:err.message
                    });
                });
        })
        .catch(err => 
        {
            res.status(400).json({
                success:false,
                message:err.message
            });
        });
    
});

const deleteParamController = ((req, res) => 
{
    const { id } = req.params;

    Order.deleteOne({ _id: id })
        .then(() => 
        {
            res.status(200).json({
                success:true,
                message: `Deleted the order id: ${ id }`
            });
        })
        .catch((err) => 
        {
            res.status(400).json({
                success:false,
                message:err.message
            });
        });
});

module.exports = { 
    getParamController, putParamController, postController, getController, deleteParamController 
};
