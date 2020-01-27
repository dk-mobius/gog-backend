const express = require('express');
const router = express.Router();
const mongoose = require('../client');


// create schema
const specialSchema = new mongoose.Schema({
    _id: String,
    product_id: String
});
const productSchema = new mongoose.Schema({
    _id: String,
    title: String,
    price: mongoose.Decimal128,
    on_sale: Boolean,
    sale_price: mongoose.Decimal128,
    discount_percentage: Number,
    promoted: Boolean,
    featured_image_url: String,
    banner_image_url: String
});

// create models
const Products = mongoose.model('products', productSchema);
const Specials = mongoose.model('specials', specialSchema);


router.get('/', function (req, res, next) {
    Products.find(function (err, products) {
        if (err) return console.log(err);
        res.json(products);
    });
});

router.post('/by-ids', function (req, res, next) {
    Products.find({_id: {$in: req.body.product_ids}}).sort({_id: -1}).exec(function (err, products) {
        if (err) return console.log(err);
        res.json(products);
    });
});

router.get('/promoted', function (req, res, next) {
    Products.find({promoted: true}, function (err, products) {
        if (err) return console.log(err);
        res.json(products);
    });
});

router.get('/game-of-week', function (req, res, next) {
    Specials.aggregate([
        {$match: {'_id': 'game_of_week'}},
        {
            $lookup: {
                'from': 'products',
                'localField': 'product_id',
                'foreignField': '_id',
                'as': 'product'
            }
        }
    ], function (err, result) {
        if (err) return console.log(err);
        res.json(result[0].product[0]);
    });
});


module.exports = router;
