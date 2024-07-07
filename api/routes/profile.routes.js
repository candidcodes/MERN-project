const { Router } = require('express')
const { Auth } = require('../controllers')

const router = Router()

router.get('/detail', Auth.profileCtrl.detail)

router.route('/update')
    .put(Auth.profileCtrl.update)
    .patch((Auth.profileCtrl.update))

router.route('/password')
    .put(Auth.profileCtrl.password)
    .patch((Auth.profileCtrl.password))
    
module.exports =  router;