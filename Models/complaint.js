const mongoose = require('mongoose')

const Schema = mongoose.Schema


let complaint = new Schema({
    email: {
        type: String
    },
    complaint_heading: {
        type: String
    },
    complaintId: {
        type: String
    },
    complaint_description: {
        type: String
    },
    created_at: {
        type: String
    }, 
    submitted: {
        type: String
    },
     accepted: {
        type: String
    },
    processing: {
        type: String
    },
    resolved: {
        type: String
    },
    Current_status: {
        type: String
    }
})

mongoose.model('Complaint', complaint)