const { Router } = require('express')
const { Cms } = require('@/controllers')

const router = Router()

router.route('/')
    .get(Cms.customerCtrl.index)
    .post(Cms.customerCtrl.store)

router.route('/:id')
    .get(Cms.customerCtrl.show)
    .put(Cms.customerCtrl.update)
    .patch(Cms.customerCtrl.update)
    .delete(Cms.customerCtrl.destroy)

module.exports =  router;