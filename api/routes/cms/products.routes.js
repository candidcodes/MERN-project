const { Router } = require('express')
const { Cms } = require('@/controllers')
const { upload } = require('@/lib')

const router = Router()

router.route('/')
    .get(Cms.ProductsCtrl.index)
    .post(upload().array('images'), Cms.ProductsCtrl.store)

router.route('/:id')
    .get(Cms.ProductsCtrl.show)
    .put(upload().array('images'), Cms.ProductsCtrl.update)
    .patch(upload().array('images'), Cms.ProductsCtrl.update)
    .delete(Cms.ProductsCtrl.destroy)

router.delete('/:id/image/:filename', Cms.ProductsCtrl.image)

module.exports =  router;