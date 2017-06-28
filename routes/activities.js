var Promise = require('bluebird');
var router = require('express').Router();
var Activity = require('../models').Activity;

router.post('/', function(req,res,next){


    Activity.findAll().then(function(foundAct){
        res.json(foundAct);
    }).catch(next);
});

module.exports = router;
