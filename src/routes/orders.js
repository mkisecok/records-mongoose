const express=require('express');

const router =express.Router();

const  { 
    getParamController, putParamController, postController, getController, deleteParamController 
} =require('../controller/orderController');

router.route('/')
    .get(getController)
    .post(postController);

router.route('/:id')
    .get(getParamController)
    .put(putParamController)
    .delete(deleteParamController);

module.exports=router;
