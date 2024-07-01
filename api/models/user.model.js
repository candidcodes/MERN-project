const { Schema, model } = require('mongoose')
const { stringRequired, booleanTrue, extraConfig } = require('../lib')


const User = model('User', new  Schema({
    name: stringRequired,

    email: {...stringRequired, unique: true},

    password: stringRequired,
    phone: {...stringRequired, maxLength: 30},
    address: stringRequired, 
    role: {type: string, enum: ['admin', 'staff', 'customer'], default: 'customer'},
    status: booleanTrue

}, extraConfig))

module.exports = User;