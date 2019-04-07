const mongoose = require('mongoose')

const Schema = mongoose.Schema


let complaint_log = new Schema({
      complaintId: {
        type: String
    },
    action_log: {
        type: String
    },
    created_at: {
        type: String
    },    
   })

mongoose.model('Complaint_log', complaint_log)