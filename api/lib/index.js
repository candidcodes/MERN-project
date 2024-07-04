const {Schema} = require ('mongoose')

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

const validationError = (next, errors) => {
    next({
        message : 'There seems to be some validation problem',
        status: 422,
        errors,
    })
}

const errorMsg = (next, error) => {
    console.log(error)
            if('errors' in error){
                let list = {}

                for(let k in error.errors){
                    list = {
                        ...list,
                        [k]: error.errors[k].message
                    }
                }
                validationError(next, list)
            } else if('code' in error && error.code == 11000){
                validationError(next, {
                    email: 'given email is already in use'
                })
            } else {
                validationError(next, {
                    message: 'something went wrong',
                    status: 400
                })
            }
}

module.exports = { stringRequired, booleanTrue, extraConfig, foreignConfig, numberRequired, validationError, errorMsg}