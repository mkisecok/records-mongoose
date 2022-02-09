const express = require('express');

const router = express.Router();

router.route('/')
.all((req,res) => 
{
    res.status(404).send('The Page is not founded');
});
module.exports = router;