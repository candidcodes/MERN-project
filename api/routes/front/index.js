const { Router } = require('express')
const prodcutsRoutes = require('./products.routes.js')
const mixRoutes = require('./mix.routes.js')

const router = Router();

router.use('/products', prodcutsRoutes)

router.use(mixRoutes)

module.exports = router;

