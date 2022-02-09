const express =require('express');


const router=express.Router();

//lowdb
const low=require('lowdb');
const FileSync=require('lowdb/adapters/FileSync');
const adapter=new FileSync('db.json');
const db=low(adapter);

db.defaults({ users:[] }).write();

router.route('/')
.get((req,res) => 
{
    const allUsers=db.get('users');
    res.status(200).json(allUsers);
})
.post((req,res) => 
{
    let id=db.get('users').value().length+1;

    const { firstName,lastName,email,password } = req.body;
    db.get('users').push({ id, firstName, lastName, email, password }).write();
    res.status(200).json(` ${firstName } ${ lastName } added as new user`)
});

router.route('/:id')
.get((req,res) => 
{
    const { id } =req.params;
    // const findUser =db.get('users').find
   
    res.status(200).send('Get a user with id '+ id )
})
.put((req,res) => 
{
    const { id } = req.params;

    res.status(200).send('Update a user with id ' + id);
})
.delete((req,res) => 
{
    const { id } = req.params;
    
    res.status(200).send('Remove a user with id ' + id );
})

module.exports=router;