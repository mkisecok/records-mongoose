const express =require('express');

const router=express.Router();

const {
    getController,
    postController,
    getParamController,
    putParamController,
    deleteParamController
} = require('../controller/usersController');

router.route('/')
    .get(getController)
    .post(postController);

router.route('/:id')
    .get(getParamController)
    .put(putParamController)
    .delete(deleteParamController);

module.exports=router;
