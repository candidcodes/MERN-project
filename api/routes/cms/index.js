const { Router } = require('express')
const staffsRoutes = require('./staffs.routes.js');
const customerRoutes = require('./customer.routes.js')
const { adminOnly } = require('@/lib/index.js');

const router = Router()

router.use('/staffs', adminOnly, staffsRoutes)

router.use('/customer', customerRoutes)


module.exports =  router;
