const express = require('express')
const  authRoutes  = require('./auth.routes.js')

const router = express.Router()

router.use('/auth', authRoutes)

router.use((req, res, next) => {
    next({
        message: 'Resource not found',
        status: 404
    })
})

module.exports =  router;