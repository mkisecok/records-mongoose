const express = require('express');
const router = express.Router();

const { 
    getParamController, postController, getController, deleteParamController, putParamController 
} = require('./../controller/recordsController');

router.route('/')
    .get(getController)
    .post(postController);

router.route('/:id')
    .get(getParamController)
    .put(putParamController )
    .delete( deleteParamController);

module.exports = router;
