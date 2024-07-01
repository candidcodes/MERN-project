const { Schema, model } = require('mongoose')
const { stringRequired, extraConfig, foreignConfig } = require('../lib');



const Review = model('Review', new  Schema({
    userId: {...foreignConfig, ref: 'User' },
    status: {type: String, enum: ['Processing', 'Confirmed', 'Shipping', 'Delivered', 'Cancelled'], default: 'Processing'}, 
}, extraConfig))

module.exports = Review;