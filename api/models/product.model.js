const { Schema, model } = require('mongoose')
const { stringRequired, booleanTrue, extraConfig, foreignConfig, numberRequired } = require("@/lib/constants")


const Product = model('Product', new  Schema({
    name: stringRequired,
    description: stringRequired,
    summary: stringRequired,
    price: {...numberRequired},
    discountedPrice : {type: Number, default: 0},
    images: [stringRequired],
    categoryId: {...foreignConfig, ref: 'Category' },
    brandId: {...foreignConfig, ref: 'Brand' },
    status: booleanTrue

}, extraConfig))

module.exports = Product;