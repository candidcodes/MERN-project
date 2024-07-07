const { stringRequired, booleanTrue, extraConfig } = require("@/lib/constants")

const {Schema, model} = require('mongoose')

const Brand = model('Brand', new Schema({
    name: stringRequired,
    status: booleanTrue
}, extraConfig))

module.exports = Brand;