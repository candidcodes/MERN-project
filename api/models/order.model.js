const { Schema, model } = require('mongoose')
const { stringRequired, extraConfig, foreignConfig } = require("@/lib/constants")



const Order = model('Order', new  Schema({
    userId: {...foreignConfig, ref: 'User' },
    status: {type: String, enum: ['Processing', 'Confirmed', 'Shipping', 'Delivered', 'Cancelled'], default: 'Processing'}, 
}, extraConfig))

module.exports = Order;