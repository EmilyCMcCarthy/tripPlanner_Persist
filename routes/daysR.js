var Promise = require('bluebird');
var router = require('express').Router();
var Day = require('../models').Day;


router.post('/', function(req,res,next){


    Day.findAll().then(function(found){
       var lastNumber = found[found.length-1].number;
       res.json(lastNumber++);
    }).catch(next);
});



module.exports = router;