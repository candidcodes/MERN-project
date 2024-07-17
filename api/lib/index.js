const jwt = require('jsonwebtoken')
const { User } = require('@/models')
const multer = require('multer')


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
            }else if('code' in error && error.code == 11000){
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

const cmsAccess = (req, res, next) => {
    if(req.user.role != "customer"){
        next()
    }else{
        next({
            message: 'Access denied',
            status: 403
        })
    }
}

const adminOnly = (req, res, next) => {
    if(req.user.role == "Admin"){
        next()
    }else{
        next({
            message: 'Access denied',
            status: 403
        })
    }
}

const customerOnly = (req, res, next) => {
    if(req.user.role == "customer"){
        next()
    }else{
        next({
            message: 'Access denied',
            status: 403
        })
    }
}

const upload = () => multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "uploads/")
        },
        filename: (req, file, cb) => {
            const ext = file.originalname.split('.').pop()
            const filename = "img"+Date.now() + '-' + Math.round(Math.random() * 1E9)+"."+ext

            cb(null, filename)
        }
    }),
    fileFilter: (req, file, cb) => {
        if(file.mimetype.startsWith('image/')){
            cb(null, true)
        }else{
            cb(new Error('file type not supported'))
        }
    }
})

module.exports = { validationError, errorMsg, auth, cmsAccess, adminOnly, upload, customerOnly}