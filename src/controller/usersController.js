
// model
const User =require('../models/User');

// chance
const Chance = require('chance');
const chance = new Chance();

const getController = ((req, res) => 
{

    User.find({})
        .then((users) => 
        {
            res.status(200).json({
                success:true,
                data: users
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
const postController = ((req, res) => 
{
    
    newUser = new User();

    newUser.firstname = chance.first();
    newUser.lastname = chance.last();
    newUser.email = chance.email({ domain: 'example.com' });
    newUser.password = chance.hash({ length: 8 });
    
    newUser.save()
        .then(user => 
        {
            res.status(200).json({
                success:true,
                data:user
            });
        })
        .catch((err) => 
        {
            res.status(400).json({
                success: false,
                message: err.message
            });
        });
    
});
const getParamController = ((req, res) => 
{
    const { id } =req.params;

    User.find({ _id:id })
        .then(user => 
        {
            res.status(200).json({
                success:true,
                data:user
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
const putParamController = ((req, res) => 
{
    const { id } = req.params;

    User.findOne({ _id: id })
        .then(user => 
        {
            user.firstname = req.body.firstname || user.firstname;
            user.lastname = req.body.lastname || user.lastname;
            user.email = req.body.email || user.email;
            user.password = req.body.password || user.password;

            user.save()
                .then(updatedUser => 
                {
                    res.status(200).json({
                        success:true,
                        newData: req.body,
                        data: updatedUser
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
const deleteParamController =((req, res) => 
{
    const { id } = req.params;

    User.deleteOne({ _id: id })
        .then(() => 
        {
            res.status(200).json({
                success:true,
                message: `Deleted the user id: ${ id }`
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

module.exports=
{
    getController,
    postController,
    getParamController,
    putParamController,
    deleteParamController
};
