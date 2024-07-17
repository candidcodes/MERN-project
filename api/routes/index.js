const express = require('express')
const  authRoutes  = require('./auth.routes.js')
const profileRoutes = require('./profile.routes.js')
const cmsRoutes = require('./cms')
const frontRoutes = require('./front')
const {auth, cmsAccess} = require('@/lib')

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/profile', auth, profileRoutes)


router.use('/cms', auth, cmsAccess, cmsRoutes)

router.use( frontRoutes)


router.use((req, res, next) => {
    next({
        message: 'Resource not found',
        status: 404
    })
})

module.exports =  router;