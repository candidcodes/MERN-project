const { Router } = require('express')
const { Auth } = require('../controllers')

const router = Router()

router.post('/register', Auth.RegisterCtrl.register)



module.exports =  router;