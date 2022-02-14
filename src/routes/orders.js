const express=require('express');

const router =express.Router();
const  { 
    getParamController, postParamController, postController, getController, deleteParamController 
} =require('../controller/orderController');

//  lowdb
const low=require('lowdb');
const FileSync=require('lowdb/adapters/FileSync');
const adapter=new FileSync('db.json');
const db=low(adapter);

db.defaults({ orders:[] }).write();

router.route('/')
    .get(getController)
    .post(postController);

router.route('/:id')
    .get(getParamController)
    .put(postParamController)
    .delete(deleteParamController);

module.exports=router;
