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

module.exports = { stringRequired, booleanTrue, extraConfig }