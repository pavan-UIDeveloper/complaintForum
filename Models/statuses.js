const mongoose = require('mongoose')

const Schema = mongoose.Schema


let statuses = new Schema({
    statusId: {
        type: Number
    },
    statusName: {
        type: String
    }
})

mongoose.model('Statuses', statuses)