const {Schema} = require ('mongoose')
const jwt = require('jsonwebtoken')
const { User } = require('@/models')



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

const auth = async (req, res, next) => {
    try{
        if('authorization' in req.headers){
            const token = req.headers.authorization.split(' ').pop()

            const decoded = jwt.verify(token, process.env.JWT_TOKEN)

            const user = await User.findById(decoded.uid)

            if (user){
                req.user = user
                next()                
            }else{
                next({
                    message: "authentication token missing",
                    status: 401
                })
            }


        }else{
            next({
                message: "authentication token missing",
                status: 401
            })
        }
    }catch(error){
        next({
            message: "authentication token is invalid",
            status: 401
        })
    }
}

module.exports = { validationError, errorMsg, auth}