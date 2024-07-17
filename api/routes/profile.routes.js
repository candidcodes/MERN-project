const { Router } = require('express')
const { Auth } = require('../controllers')
const { customerOnly } = require('@/lib')


const router = Router()

router.get('/detail', Auth.profileCtrl.detail)

router.route('/update')
    .put(Auth.profileCtrl.update)
    .patch(Auth.profileCtrl.update)

router.route('/password')
    .put(Auth.profileCtrl.password)
    .patch(Auth.profileCtrl.password)
    
router.get('/reviews', customerOnly, Auth.profileCtrl.reviews)

router.get('/orders', customerOnly, Auth.profileCtrl.orders)


module.exports =  router;