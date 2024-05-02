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


module.exports = router