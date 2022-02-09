const express = require('express');

const low=require('lowdb');
const FileSync=require('lowdb/adapters/FileSync');
const adapter=new FileSync('db.json');
const db=low(adapter);

const app=express();

const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded( { extended:true }) );
app.use(bodyParser.json());

const port=3000;

// cors as middleware 
 const { middlewareSecurity }=require('../middlewares/middlewareSecurity');
 app.use(middlewareSecurity());

db.defaults({ records:[] }).write();

app.use(express.json());

app.route('/records')
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

// app.get('/records', (req, res) =>
// {
    
//     const allRecords=db.get('records');
//     res.status(200).json(allRecords);
// });



// app.post('/records', (req, res) => 
// {   
//     let id=db.get('records').value().length+1;
//     const
//         {
//             title,
//             artist,
//             year,
//             price
//         }=req.body;
//     db.get('records').push({
//         id,
//         title,
//         artist,
//         year,
//         price
//     }).write();
//     res.status(200).json(`New record ${title} added ! `);
// });

app.listen(port, () => 
{
    console.log(`Server running in port:${port} `);
});
