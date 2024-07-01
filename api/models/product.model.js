const { Schema, model } = require('mongoose')
const { stringRequired, booleanTrue, extraConfig, foreignConfig } = require('../lib');



const Product = model('Product', new  Schema({
    name: stringRequired,
    description: stringRequired,
    summary: stringRequired,
    price: {type: Number, required: true},
    discountedPrice : {type: Number, default: 0},
    images: [stringRequired],
    categoryId: {...foreignConfig, ref: 'Category' },
    brandId: {...foreignConfig, ref: 'Brand' },
    status: booleanTrue

}, extraConfig))

module.exports = Product;