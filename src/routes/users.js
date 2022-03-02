const express =require('express');
const validator = require('express-validator');
// const { middleWareUsers }= require('../middlewares/middleWareUsers');
const router=express.Router();

const {
    getController,
    postController,
    getParamController,
    putParamController,
    deleteParamController
} = require('../controller/usersController');
const { middleWareUsers }  = require('../middlewares/middleWareUsers');

router.route('/')
    .get(getController)
    .post(middleWareUsers.email, middleWareUsers.password, middleWareUsers.confirm, postController);

router.route('/:id')
    .get(getParamController)
    .put(putParamController)
    .delete(deleteParamController);

module.exports=router;
