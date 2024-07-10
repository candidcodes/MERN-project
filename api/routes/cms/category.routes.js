const { Router } = require('express')
const { Cms } = require('@/controllers')

const router = Router()

router.route('/')
    .get(Cms.categoryCtrl.index)
    .post(Cms.categoryCtrl.store)

router.route('/:id')
    .get(Cms.categoryCtrl.show)
    .put(Cms.categoryCtrl.update)
    .patch(Cms.categoryCtrl.update)
    .delete(Cms.categoryCtrl.destroy)

module.exports =  router;