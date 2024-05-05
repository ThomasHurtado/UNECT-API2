const router = require('express').Router()

const PetController = require('../controllers/PetController')
const checkToken = require('../helpers/check-Token')

//create
router.post('/create', checkToken, PetController.create)

//todos os pets
router.get('/', PetController.getAll)

//pets do usuario
router.get('/mypets', checkToken, PetController.getAllUserPets)

//pet by ID
router.get('/:id', PetController.getPetbyId)

//remove by ID
router.delete('/:id', checkToken, PetController.removebyId)

//atualizar pet
router.patch('/:id', checkToken, PetController.updatePet)

//marcar visita
router.patch('/schedule/:id', checkToken, PetController.schedule)


module.exports = router