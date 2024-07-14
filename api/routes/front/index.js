const { Router } = require('express')
const prodcutsRoutes = require('./products.routes.js')

const router = Router();

router.use('/products', prodcutsRoutes)

module.exports = router;

