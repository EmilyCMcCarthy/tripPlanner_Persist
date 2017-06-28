var Promise = require('bluebird');
var router = require('express').Router();
var Hotel = require('../models').Hotel;


router.get('/', function(req,res,next){


    Hotel.findAll().then(function(found){
        res.json(found);
    }).catch(next);
});

module.exports = router;