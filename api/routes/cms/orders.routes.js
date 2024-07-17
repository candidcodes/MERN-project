const { Router } = require('express')
const { Cms } = require('@/controllers')

const router = Router()

router.get('/', Cms.OrdersCtrl.index)

router.route('/:id')
    .put(Cms.OrdersCtrl.update)
    .patch(Cms.OrdersCtrl.update)
    .delete(Cms.OrdersCtrl.destroy)


module.exports =  router;