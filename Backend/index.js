const express = require('express')
const mongoose = require('mongoose')

const app = express()

//config JSON
app.use(express.json())

//public for images
app.use(express.static('public'))

//Routes
const UserRoutes = require('./routes/UserRoutes')
const PetRoutes = require('./routes/PetRoutes')

app.use('/users', UserRoutes)
app.use('/pets', PetRoutes)

app.listen(5000)
