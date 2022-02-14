const express=require('express');

const router =express.Router();

const  { 
    getParamController, postParamController, postController, getController, deleteParamController 
} =require('../controller/orderController');

router.route('/')
    .get(getController)
    .post(postController);

router.route('/:id')
    .get(getParamController)
    .put(postParamController)
    .delete(deleteParamController);

module.exports=router;
