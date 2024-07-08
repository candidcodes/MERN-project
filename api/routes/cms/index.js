const { Router } = require('express')
const staffsRoutes = require('./staffs.routes.js');
const { adminOnly } = require('@/lib/index.js');

const router = Router()

router.use('/staffs', adminOnly, staffsRoutes)


module.exports =  router;
