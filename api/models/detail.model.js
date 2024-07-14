const { Schema, model } = require('mongoose')
const { extraConfig, foreignConfig, numberRequired } = require("@/lib/constants")



const Detail = model('Detail', new  Schema({
    productId: {...foreignConfig, ref: 'Product'},
    orderId: {...foreignConfig, ref: 'order'},
    price: numberRequired,
    total: numberRequired,

}, extraConfig))

module.exports = Detail;