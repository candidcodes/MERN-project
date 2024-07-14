const { Router } = require('express')
const {Front} = require('@/controllers')
const {auth} = require('@/lib')

const router = Router();

router.get('/latest', Front.ProductsCtrl.latest)
router.get('/featured', Front.ProductsCtrl.featured)
router.get('/top-selling', Front.ProductsCtrl.topSelling)
router.get('/search', Front.ProductsCtrl.search)
router.get('/:id', Front.ProductsCtrl.show)
router.get('/:id/similar', Front.ProductsCtrl.similar)
router.post('/:id/review',auth, Front.ProductsCtrl.review)

module.exports = router

