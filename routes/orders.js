const express=require('express');

const router =express.Router();

//  lowdb
const low=require('lowdb');
const FileSync=require('lowdb/adapters/FileSync');
const adapter=new FileSync('db.json');
const db=low(adapter);

db.defaults({ orders:[] }).write();

router.route('/')
    .get((req, res) => 
    {
        const allOrders=db.get('orders');
        res.status(200).json(allOrders);
    })
    .post((req, res) =>
    {
        let listId=db.get('orders').value().length+1;
        const { productId, quantity } = req.body;

        db.get('orders').push(
            { listId, productId, quantity }).write();
        res.status(200).json(`New order ${ productId} posted`);
    });

router.route('/:id')
    .get((req, res) => 
    {
        const { id } = req.params;

        res.status(200).send('Get an Order with ProductId ' + id );
    })
    .put((req, res) => 
    {
        const { id } = req.params;

        res.status(200).send('Update an Order with ProductId ' + id);
    })
    .delete((req, res) => 
    {
        const { id } = req.params;
    
        res.status(200).send('Remove an Order with ProductId ' + id );
    });

module.exports=router;
