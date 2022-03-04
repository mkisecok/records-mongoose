
// Authorization for post and delete 
const basicAuth = require('express-basic-auth');
const users={ users: { 'mahmut': 'test123' }, unauthorizedResponse: 'Your password or username is false' };

// model
const Record = require('../models/Record');

// chance
const Chance = require('chance');
const chance = new Chance();

const getController= ((req, res) => 
{
    Record.find({})
        .then((records) =>
        {
            res.status(200).json({
                success:true,
                data: records
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

const postController = ( basicAuth(users), (req, res) => 
{

    newRecord = new Record();

    newRecord.title = chance.word();
    newRecord.artist = chance.name();
    newRecord.year = parseInt(chance.year({ min: 1980, max: 2022 }));
    newRecord.price =chance.integer({ min: 5, max: 25 });

    newRecord.save((err, record) =>
    {
        if(err) throw err;

        res.json(record);
    });
    
});

const getParamController = ( (req, res) => 
{
    const { id } = req.params;

    Record.find({ _id:id })
        .then((record) =>
        {
            res.status(200).json({
                success:true,
                data:record
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

const putParamController = ( basicAuth(users), (req, res) => 
{
    const { id } = req.params;

    Record.findOne({ _id:id })
        .then((record) =>
        {
            record.title = req.body.title || record.title;
            record.artist = req.body.artist || record.artist;
            record.year = req.body.year || record.year;
            record.price = req.body.price ||record.price;

            record.save()
                .then((updatedRecord) => 
                {
                    res.status(200).json({
                        success: true,
                        newData:req.body,
                        data:updatedRecord
                    });

                })
                .catch((err) => 
                {
                    res.status(400).json({
                        success:false,
                        message:err.message
                    });
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

const deleteParamController = (basicAuth(users), (req, res) => 
{
    const { id } = req.params;

    Record.deleteOne({ _id: id })
        .then(() => 
        {
            res.status(200).json({
                success:true,
                message: `Deleted the data id: ${ id } `
            });
        })
        .catch((err) => 
        {
            res.status(400).json({
                success:false,
                message: err.message
            });
        });

});

module.exports = { 
    getParamController, postController, getController, deleteParamController, putParamController 
};
