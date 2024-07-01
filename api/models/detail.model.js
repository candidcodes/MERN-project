const { Schema, model } = require('mongoose')
const { stringRequired, extraConfig, foreignConfig, numberRequired } = require('../lib');



const Review = model('Review', new  Schema({
    productId: {...foreignConfig, ref: 'Product'},
    orderId: {...foreignConfig, ref: 'order'},
    price: numberRequired,
    total: numberRequired,

}, extraConfig))

module.exports = Review;