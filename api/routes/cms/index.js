const { Router } = require('express')
const staffsRoutes = require('./staffs.routes.js');
const customerRoutes = require('./customers.routes.js')
const categoryRoutes = require('./categories.routes.js')
const brandRoutes = require('./brands.routes.js')
const productsRoutes = require('./products.routes.js')
const reviewsRoutes = require('./reviews.routes.js')
const ordersRoutes = require('./orders.routes.js')
const { adminOnly } = require('@/lib/index.js');

const router = Router()

router.use('/staffs', adminOnly, staffsRoutes)

router.use('/customer', customerRoutes)

router.use('/category', categoryRoutes)

router.use('/brand', brandRoutes)

router.use('/product', productsRoutes)

router.use('/reviews', reviewsRoutes)

router.use('/orders', ordersRoutes)


module.exports =  router;
