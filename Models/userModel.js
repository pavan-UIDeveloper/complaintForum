const mongoose = require('mongoose')

const Schema = mongoose.Schema


let user = new Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    userId: {
        type: String
    }
})

mongoose.model('User', user)