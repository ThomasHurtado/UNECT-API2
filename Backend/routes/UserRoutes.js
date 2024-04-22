const router = require('express').Router()

const UserController = require('../controllers/UserController')

//registro
router.post('/register', UserController.register)

//login
router.post('/login', UserController.login)

//rota privada
router.get('/:id', UserController.checkToken, UserController.private)


module.exports = router