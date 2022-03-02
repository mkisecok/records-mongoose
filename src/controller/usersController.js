
// model
const User =require('../models/User');

// validator
const validator = require('express-validator');

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
const postController = (  
    (req, res) => 
    {   
    
        const { 
            password, email, firstName, lastName  
        } = req.body;
        console.log('reqbody output', req.body);

        // create error for validation
        const error = validator.validationResult(req).errors;
        console.log(error);
        if(error.length > 0 )
        {
            return res.status(400).json({
                success:false,
                message:error
            });
        }

        newUser = new User();

        newUser.firstName = firstName || chance.first();
        newUser.lastName = lastName || chance.last();
        newUser.email = email || chance.email({ domain: 'example.com' });
        newUser.password = newUser.hashPassword(password); 
        newUser.adress = { 
            zip: req.body.zip || chance.zip({ plusfour: true }),
            street:req.body.street || chance.street({ short_suffix: true }),
            state:req.body.state || chance.state({ full: true }),
            city:req.body.city || chance.city(),
        };
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
    // console.log('before', req.body);
    const { id } = req.params;
    const { password } =req.body;
    console.log( 'afterParams', password);
    newUser = new User();

    User.findOne({ _id: id })
        .then(user => 
        {   
            console.log('before', user.password);
            user.firstname = req.body.firstname || user.firstname;
            user.lastname = req.body.lastname || user.lastname;
            user.email = req.body.email || user.email;
            req.body.password && (user.password = newUser.hashPassword(password));
            console.log('after', user.password);
            user.save()
                .then(updatedUser => 
                {   
                    if(password)
                    {   
                        req.body.password=newUser.hashPassword(password);
                        res.status(200).json({
                            success:true,
                            newData: req.body,
                            data: updatedUser
                        });   
                    }
                    else
                    {
                        res.status(200).json({
                            success:true,
                            newData: req.body,
                            data: updatedUser
                        });
                    }
                    
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
