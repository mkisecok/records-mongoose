
//  lowdb
const low=require('lowdb');
const FileSync=require('lowdb/adapters/FileSync');
const adapter=new FileSync('db.json');
const db=low(adapter);
const path = require('path');
db.defaults({ orders:[] }).write();

const getController= ((req, res) => 
{   
    // const allOrders=db.get('orders');
    // res.status(200).json(allOrders);
    res.status(200).sendFile(path.join(__dirname, '../../public/index.html'));

});

const postController = ((req, res) =>
{
    let listId=db.get('orders').value().length+1;
    const { productId, quantity } = req.body;
    console.log(productId, quantity);

    db.get('orders').push(
        { listId, productId, quantity }).write();
    res.status(200).json({ success:true });
});

const getParamController = ( (req, res) => 
{
    const { id } = req.params;

    res.status(200).send('Get an Order with ProductId ' + id );
});

const postParamController = ( (req, res) => 
{
    const { id } = req.params;

    res.status(200).send('Update an Order with ProductId ' + id);
});

const deleteParamController = ((req, res) => 
{
    const { id } = req.params;

    res.status(200).send('Remove an Order with ProductId ' + id );
});

module.exports = { 
    getParamController, postParamController, postController, getController, deleteParamController 
};
