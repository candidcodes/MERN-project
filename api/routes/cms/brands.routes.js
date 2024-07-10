const { Router } = require('express')
const { Cms } = require('@/controllers')

const router = Router()

router.route('/')
    .get(Cms.brandCtrl.index)
    .post(Cms.brandCtrl.store)

router.route('/:id')
    .get(Cms.brandCtrl.show)
    .put(Cms.brandCtrl.update)
    .patch(Cms.brandCtrl.update)
    .delete(Cms.brandCtrl.destroy)

module.exports =  router;