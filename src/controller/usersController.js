// lowdb
const low=require('lowdb');
const FileSync=require('lowdb/adapters/FileSync');
const adapter=new FileSync('db.json');
const db=low(adapter);

db.defaults({ users:[] }).write();

const getController = ((req, res) => 
{
    const allUsers=db.get('users');
    res.status(200).json(allUsers);
});
const postController = ((req, res) => 
{
    let id=db.get('users').value().length+1;

    const 
        { 
            firstName, lastName, email, password 
        } = req.body;
    db.get('users').push(
        { 
            id, firstName, lastName, email,  password 
        }).write();
    res.status(200).json(` ${firstName } ${ lastName } added as new user`);
});
const getParamController = ((req, res) => 
{
    const { id } =req.params;

    res.status(200).send('Get a user with id '+ id );
});
const putParamController = ((req, res) => 
{
    const { id } = req.params;

    res.status(200).send('Update a user with id ' + id);
});
const deleteParamController =((req, res) => 
{
    const { id } = req.params;

    res.status(200).send('Remove a user with id ' + id );
});

module.exports=
{
    getController,
    postController,
    getParamController,
    putParamController,
    deleteParamController
};
