const { Schema } = require('mongoose')


let stringRequired = {
    type: String,
    required: true
}
let booleanTrue = {type: Boolean, default: true}

let extraConfig = {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
}

let numberRequired = {
    type: Number,
    required: true
}

let foreignConfig = {type: Schema.Types.ObjectId, required: true}

module.exports = {
    stringRequired,
    booleanTrue,
    extraConfig,
    numberRequired,
    foreignConfig
}