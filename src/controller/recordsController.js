
// Authorization for post and delete 
const basicAuth = require('express-basic-auth');
const users={ users: { 'mahmut': 'test123' }, unauthorizedResponse: 'Your password or username is false' };

// lowdb
const low=require('lowdb');
const FileSync=require('lowdb/adapters/FileSync');
const adapter=new FileSync('db.json');
const db=low(adapter);

db.defaults({ records:[] }).write();

const getController= ((req, res) => 
{
    const allRecords=db.get('records');
    res.status(200).json(allRecords);
});

const postController = ( basicAuth(users), (req, res) => 
{
    let id=db.get('records').value().length+1;

    const { 
        title, artist, year, price 
    }
    = req.body;

    db.get('records').push( 
        { 
            id, title, artist, year, price 
        }).write();

    res.status(200).json(`New record ${title} added ! `);
});

const getParamController = ( (req, res) => 
{
    const { id } = req.params;

    res.status(200).send('Get the record with id ' + id);
});

const putParamController = ( basicAuth(users), (req, res) => 
{
    const { id } = req.params;

    res.status(200).send('Update the record with id' + id);
});

const deleteParamController = (basicAuth(users), (req, res) => 
{
    const { id } = req.params;

    res.status(200).send('Delete the record with id' + id);
});

module.exports = { 
    getParamController, postController, getController, deleteParamController, putParamController 
};
