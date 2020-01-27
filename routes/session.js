const express = require('express');
const router = express.Router();
const uuidv1 = require('uuid/v1');
const mongoose = require('../client');

// create schema
const sessionSchema = new mongoose.Schema({
    _id: String,
    cart_products: Array
});

// create model
const Session = mongoose.model('sessions', sessionSchema);

router.get('/create', function (req, res) {
    let currentSession = new Session({
        _id: uuidv1(),
        cart_products: []
    });
    currentSession.save(function (err, currentSession) {
        if (err) return console.log(err);
        res.json(currentSession);
    })

});

router.post('/read', function (req, res) {
    Session.findOne({_id: req.body.uuid}, function (err, currentSession) {
        if (err) return console.log(err);
        res.json(currentSession);
    });
});


router.post('/update', function (req, res) {
    Session.findOneAndUpdate({_id: req.body.uuid}, {cart_products: req.body.cart_products}, {upsert: true}, function (err, currentSession) {
        if (err) return console.log(err);
        res.json(currentSession);
    })
});


module.exports = router;
