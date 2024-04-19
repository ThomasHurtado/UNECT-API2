const express = require('express')
const mongoose = require('mongoose')

const app = express()

//config JSON
app.use(express.json())

//public for images
app.use(express.static('public'))

//Routes
const UserRoutes = require('./routes/UserRoutes')

app.use('/users', UserRoutes)

mongoose
    .connect('mongodb+srv://thomashurtado:1234@cluster0.zpyeus7.mongodb.net/BancoAPI?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log("Conectamos ao banco")
        app.listen(5000)
    })
    .catch((err) => console.log(err))
