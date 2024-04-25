const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://thomashurtado:1234@cluster0.zpyeus7.mongodb.net/BancoAPI?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log("Conectamos ao banco")
    })
    .catch((err) => console.log(err))

module.exports = mongoose