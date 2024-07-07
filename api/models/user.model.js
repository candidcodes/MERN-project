const { Schema, model } = require('mongoose')
const { stringRequired, booleanTrue, extraConfig } = require("@/lib/constants")


const User = model('User', new  Schema({
    name: stringRequired,

    email: {...stringRequired, unique: true},

    password: { ...stringRequired, select: false },
    phone: {...stringRequired, maxLength: [30, 'the phone must be less than 30 char']},
    address: stringRequired, 
    role: {type: String, enum: ['admin', 'staff', 'customer'], default: 'customer'},
    status: booleanTrue

}, extraConfig))

module.exports = User;