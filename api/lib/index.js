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

let foreignConfig = {type: Schema.Types.ObjectId, required: true}

module.exports = { stringRequired, booleanTrue, extraConfig, foreignConfig }