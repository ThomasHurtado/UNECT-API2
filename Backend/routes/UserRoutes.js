const router = require('express').Router()

const UserController = require('../controllers/UserController')
const checkToken = require('../helpers/check-Token')

//registro
router.post('/register', UserController.register)

//login
router.post('/login', UserController.login)

//rota privada
router.get('/:id', UserController.private)

//edit user
router.patch('/edit/:id', checkToken, UserController.editUser)

//delet user
router.delete('/delete/:id', UserController.deleteUser)

module.exports = router