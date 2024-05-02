const Pet = require('../models/Pet')
const User = require('../models/User')
const ObjectID = require('mongoose').Types.ObjectId

//helpers
const checkToken = require('../helpers/check-Token')

module.exports = class PetController {

    //create
    static async create(req, res){
        
        const {name, age, weight, color} = req.body

        const available = true

        // validacoes
        if(!name){
            res.status(422).json({message: 'O nome é obrigatorio!'})
            return
        }

        if(!age){
            res.status(422).json({message: 'A idade é obrigatorio!'})
            return
        }

        if(!weight){
            res.status(422).json({message: 'O peso é obrigatorio!'})
            return
        }

        if(!color){
            res.status(422).json({message: 'A cor é obrigatorio!'})
            return
        }

        const user = await User.findById(req.id)

        const pet = new Pet({
            name,
            age,
            weight,
            color,
            available,
            user: {
                _id: user._id,
                name: user.name,
                phone: user.phone
            },
        })

        try {

            const newPet = await pet.save()
            res.status(201).json({message: 'Pet cadastrado com sucesso!', newPet,
        })
            
        } catch (error) {
            res.status(500).json({message: error})
        }
    }

    static async getAll(req, res){

        const pets = await Pet.find().sort('-createdAt')

        res.status(200).json({pets: pets,})
    }

    static async getAllUserPets(req, res){

        //get user
        const user = await User.findById(req.id)

        const pets = await Pet.find({'user._id': user._id}).sort('-createdAt')

        res.status(200).json({pets,})
    }

    static async getPetbyId(req, res){

        const id = req.params.id

        if(!ObjectID.isValid(id)){
            res.status(422).json({message: 'ID invalido!'})
            return
        }

        const pet = await Pet.findOne({_id: id})

        if(!pet){
            res.status(404).json({message: 'Pet nao encontrado!'})
            return
        }

        res.status(200).json({pet: pet,})
    }

    static async removebyId(req, res){

        const id = req.params.id

        if(!ObjectID.isValid(id)){
            res.status(422).json({message: 'ID invalido!'})
            return
        }

        const pet = await Pet.findOne({_id: id})

        if(!pet){
            res.status(404).json({message: 'Pet nao encontrado!'})
            return  
        }
        

    }
}