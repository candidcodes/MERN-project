const { Router } = require('express')
const staffsRoutes = require('./staffs.routes.js');
const customerRoutes = require('./customer.routes.js')
const categoryRoutes = require('./category.routes.js')
const brandRoutes = require('./brands.routes.js')
const productsRoutes = require('./products.routes.js')
const { adminOnly } = require('@/lib/index.js');

const router = Router()

router.use('/staffs', adminOnly, staffsRoutes)

router.use('/customer', customerRoutes)

router.use('/category', categoryRoutes)

router.use('/brand', brandRoutes)

router.use('/product', productsRoutes)


module.exports =  router;
