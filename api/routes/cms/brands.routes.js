const { Router } = require('express')
const { Cms } = require('@/controllers')

const router = Router()

router.route('/')
    .get(Cms.BrandsCtrl.index)
    .post(Cms.BrandsCtrl.store)

router.route('/:id')
    .get(Cms.BrandsCtrl.show)
    .put(Cms.BrandsCtrl.update)
    .patch(Cms.BrandsCtrl.update)
    .delete(Cms.BrandsCtrl.destroy)

module.exports =  router;