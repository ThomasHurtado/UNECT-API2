const User = require('../models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()


function checkToken(req, res, next) {
        
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        res.status(401).json({message: 'Acesso negado!'})
        return
       }

       try {

        const secret = process.env.SECRET

        jwt.verify(token, secret, async (err, decoded) =>{
            if(err) return res.status(400).json({message: 'Token inválido!'})

            req.id = decoded.id
            next()
        })

        

       } catch (error) {
        res.status(400).json({message: 'Token inválido!'})
       }
}

module.exports = checkToken