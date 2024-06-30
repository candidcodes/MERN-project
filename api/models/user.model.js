const { Timestamp } = require('mongodb')
const { Schema, model } = require('mongoose')


const User = model('User', new  Schema({
    name: {type: string, required: true},
    email: {type: string, requred: true, unique: true},
    password: {type: string, required: true},
    phone: {type: string, required: true, maxLength: 30},
    address: {type: string, required: true}, 
    role: {type: string, enum: ['admin', 'staff', 'customer'], default: 'customer'},
    status: {type: Boolean, default: true}

}, {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
}))

module.exports = User;