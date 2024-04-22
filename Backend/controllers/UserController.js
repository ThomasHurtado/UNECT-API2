const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = class UserController {
     static async register(req, res) {
        const {name, email, phone, password, confirmpassword} = req.body

        if(!name){
            res.status(422).json({message: 'O nome é obrigatorio!'})
            return
        }

        if(!email){
            res.status(422).json({message: 'O email é obrigatorio!'})
            return
        }

        if(!phone){
            res.status(422).json({message: 'O telefone é obrigatorio!'})
            return
        }

        if(!password){
            res.status(422).json({message: 'A senha é obrigatorio!'})
            return
        }

        if(!confirmpassword){
            res.status(422).json({message: 'A confirmamção de senha é obrigatorio!'})
            return
        }

        if(password !== confirmpassword){
            res.status(422).json({message: 'As senhas devem ser iguais!'})
            return
        }

        const userExist = await User.findOne({email: email})

        if(userExist){
            res.status(422).json({message: 'Esse email ja foi cadastrado!'})
            return
        }

        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        const user = new User({
            name: name,
            email: email,
            phone: phone,
            password : passwordHash,
        })

        try {
            
            const newUser = await user.save()
            res.status(201).json({message: 'Usuario criado com sucesso', newUser})

        } catch (error) {
            res.status(500).json({message: error})
        }
     }

     static async login(req, res) {

        const {email, password} = req.body

        //validar
        if(!email){
            res.status(422).json({message: 'O email é obrigatorio!'})
            return
        }

        if(!password){
            res.status(422).json({message: 'A senha é obrigatorio!'})
            return
        }

        //check user
        const user = await User.findOne({email: email})

        if(!user){
            res.status(422).json({message: 'Usuario não cadastrado!'})
            return
        }

        //check password
        const checkPassword = await bcrypt.compare(password, user.password)

        if(!checkPassword){
            res.status(422).json({message: 'Senha invalida!'})
            return
        }

        try {
        
        const secret = process.env.SECRET 
        const token = jwt.sign(
            {
                id: user._id
            },
            secret,
        )
        res.status(200).json({message: 'Autenticação bem sucedida!', token})

        } catch (error) {
            res.status(500).json({message: error})
        }
     }

     static async private(req, res){

        const id = req.params.id

        //check usuario
        const user = await User.findById(id, '-password')

        if(!user){
            res.status(404).json({message: 'Usuario não encontrado!'})
            return
        }

        try {
            res.status(200).json(user)
            
        } catch (error) {
            res.status(500).json({message: error})
        }
     }

     static checkToken(req, res, next) {
        
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
 
        if(!token){
            res.status(401).json({message: 'Acesso negado!'})
            return
           }
    
           try {
    
            const secret = process.env.SECRET
    
            jwt.verify(token, secret)
    
            next()
    
           } catch (error) {
            res.status(400).json({message: 'Token inválido!'})
           }
 }
}   