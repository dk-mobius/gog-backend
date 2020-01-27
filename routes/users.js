const express = require('express');
const router = express.Router();
const mongoose = require('../client');

// create schema
const userSchema = new mongoose.Schema({
    _id: String,
    username: String,
    first_name: String,
    last_name: String,
    owned_products: Array
});

// create model
const User = mongoose.model('users', userSchema);

// Retrieves a test user, will implement user authentication later
// TODO: Create User authentication logic

router.get('/test', function (req, res, next) {
    User.findOne({_id: '1'}, function (err, currentUser) {
        if (err) return console.log(err);
        res.json(currentUser);
    });
});


module.exports = router;
