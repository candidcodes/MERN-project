
const { Schema, model } = require('mongoose')
const { stringRequired, booleanTrue, extraConfig } = require("@/lib/constants")


const Category = model('Category', new  Schema({
    name: stringRequired,
    status: booleanTrue

}, extraConfig))

module.exports = Category;