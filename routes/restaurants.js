var Promise = require('bluebird');
var router = require('express').Router();
var Restaurant = require('../models').Restaurant;

router.get('/', function(req,res,next){


    Restaurant.findAll().then(function(found){
        res.json(found);
    }).catch(next);
});

module.exports = router;