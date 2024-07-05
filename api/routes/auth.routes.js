const { Router } = require('express')
const { Auth } = require('../controllers')

const router = Router()

router.post('/register', Auth.RegisterCtrl.register)
router.post('/login', Auth.LoginCtrl.login)



module.exports =  router;