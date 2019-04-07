const express = require('express')
const mongoose = require('mongoose')
const schema = require('../../Models/complaint')
const schema2 = require('../../Models/complaint_log')
const schema3 = require('../../Models/statuses')
const complaintModel = mongoose.model('Complaint')
const complaint_logModel = mongoose.model('Complaint_log')
const statusesModel = mongoose.model('Statuses')
const shortId = require('shortid')



//Create complaint
exports.createComplaint = (req, res) => {
if(!req.body.email || !req.body.complaint_heading || !req.body.complaint_description || !req.body.status){
return res.status(200).json({
    message:'Fields are Empty'
})
}
let time = new Date();
let d=time.toString()
console.log(d)
let complaint = new complaintModel({
    complaintId:shortId.generate(),
    email:req.body.email,
    complaint_heading:req.body.complaint_heading,
    complaint_description:req.body.complaint_description,
    created_at:d,
    submitted:d,
    Current_status:req.body.status
}) 
complaint.save().then((result)=>{
    if(!result){
        return res.status(400).json({
            err:err
        }) 
    }else{
        let complaint_log = new complaint_logModel({
            complaintId:result.complaintId,
            action_log:'Complaint Submited Success Fully',
            created_at:d
        })
        complaint_log.save((err,result)=>{
            if(err){
                return res.status(400).json({
                    err:err
                })  
            }else{
                return res.status(200).json({
                    message:'Complaint Saved Success Fully',
                    result:result
                })  
            }
        }) 
    }
}).catch(err=>{
    console.log(err)
})
}

//Update action log and status
exports.updateComplaint = (req,res)=>{
    let time = new Date();
    let d=time.toString();
    console.log(req.body.complaintId)
    console.log(req.body.status)
    complaintModel.find().then(result=>{
    if(req.body.status=="Accepted" && !result.accepted){
        complaintModel.updateOne({complaintId:req.body.complaintId},{$set:{Current_status:req.body.status,accepted:d}}).then(responce=>{
            return res.status(200).json({
                message:'Status has been changed to Accepted',
                result:responce
            }) 
        })
    }else if(req.body.status=="Processing" && !result.processing){
        complaintModel.updateOne({complaintId:req.body.complaintId},{$set:{Current_status:req.body.status,processing:d}}).then(responce=>{
            return res.status(200).json({
                message:'Status has been changed to Processing'
            })
        })
    }else if(req.body.status=="Resolved" && !result.resolved){
        complaintModel.updateOne({complaintId:req.body.complaintId},{$set:{Current_status:req.body.status,resolved:d}}).then(responce=>{
            return res.status(200).json({
                message:'Status has been changed to Resolved'
            })
        })
    }else{
        return res.status(400).json({
            message:'Some thing went wrong Update properly'
        })
    
    }
})

    // complaintModel.findOne({complaintId:req.body.complaintId}).then(result=>{
    //     let previous_status = result.Current_status;
    //     let present_status = req.body.status;
    //     let Current_status = `Status changed from ${previous_status} to ${present_status}`;
    //     let complaint_log = new complaint_logModel({
    //         complaintId:req.body.complaintId,
    //         action_log:Current_status,
    //         created_at:d
    //     })
    //     complaintModel.update({complaintId:req.body.complaintId},{$set:{Current_status:req.body.status}}).then((result=>{
    //         if(!result){
    //             return res.status(400).json({
    //                 err:err
    //             }) 
    //         }else{
    //             complaint_log.save((err,result)=>{
    //                 if(err){
    //                     return res.status(400).json({
    //                         err:err
    //                     })
    //                 }else{
    //                     return res.status(200).json({
    //                         message:'Status Updated Success Fully',
    //                         result:result
    //                     })
    //                 }
    //             })
    //         }
    //     }))
       

    // }) 

}


//getting complaints details

exports.getComplaintDetails = (req,res)=>{
complaintModel.find().then(result=>{
    if(!result){
        return res.status(400).json({
            message:'No Data Found'
        })
    }else{
        return res.send(result)            
     
        // complaint_logModel.aggregate([{$group:{_id:"$complaintId",action_log:{$push:'$action_log',},created_at:{$push:'$created_at'}}}]).then(result2=>{
        //     if(!result2){
        //         return res.status(400).json({
        //             message:'No Data Found'
        //         }) 
        //     }else{
        //         return res.status(200).json({
        //             complaintData:result,
        //             complaint_log_data:result2
        //         })
        //     }
        // })
    }
})
}

exports.getStatuses = (req,res)=>{
    statusesModel.find().then(result=>{
        res.send(result)
    })
}