const { Router } = require('express')
const { Cms } = require('@/controllers')

const router = Router()

router.route('/')
    .get(Cms.brandsCtrl.index)
    .post(Cms.brandsCtrl.store)

router.route('/:id')
    .get(Cms.brandsCtrl.show)
    .put(Cms.brandsCtrl.update)
    .patch(Cms.brandsCtrl.update)
    .delete(Cms.brandsCtrl.destroy)

module.exports =  router;