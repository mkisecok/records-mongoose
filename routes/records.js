const express = require('express');

const router = express.Router();

// lowdb
const low=require('lowdb');
const FileSync=require('lowdb/adapters/FileSync');
const adapter=new FileSync('db.json');
const db=low(adapter);

db.defaults({ records:[] }).write();


router.route('/')
.get((req,res) => 
{
    const allRecords=db.get('records');
    res.status(200).json(allRecords);
})
.post((req,res) => 
{
    let id=db.get('records').value().length+1;

    const { title, artist, year, price } = req.body;

    db.get('records').push({ id, title, artist, year, price }).write();

    res.status(200).json(`New record ${title} added ! `);
})

router.route('/:id')
.get((req,res) => 
{
    const { id } = req.params;

    res.status(200).send('Get the record with id ' + id);
})
.put((req,res) => 
{
    const { id } = req.params;

    res.status(200).send('Update the record with id' + id);
})
.delete((req,res) => 
{
    const { id } = req.params;

    res.status(200).send('Delete the record with id' + id);
});

module.exports = router;