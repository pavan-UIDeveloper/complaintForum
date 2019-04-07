const express = require('express')
const router = express.Router();
const checkAuth = require('../../Middleware/checkAuth')

const complaintController = require('./complaint.controlller')
router.post('/createComplaint',checkAuth,complaintController.createComplaint)
router.post('/updateComplaint',checkAuth,complaintController.updateComplaint)
router.get('/getComplaintDetails',complaintController.getComplaintDetails)
router.get('/getStatuses',complaintController.getStatuses)



module.exports = router;
