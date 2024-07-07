const { Schema, model } = require('mongoose')
const { stringRequired, extraConfig, foreignConfig, numberRequired } = require("@/lib/constants")



const Review = model('Review', new  Schema({
    comment: stringRequired,
    rating: {...numberRequired, min: 1, max: 5},
    productId: {...foreignConfig, ref: 'Product' },
    userId: {...foreignConfig, ref: 'User' }

}, extraConfig))

module.exports = Review;