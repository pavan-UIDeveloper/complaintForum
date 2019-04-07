
const express = require('express')
const schema = require('../../Models/userModel')
const mongoose = require('mongoose')
const userModel = mongoose.model('User')

const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const shortId = require('shortid')


//user SignUp API
exports.UserSignUp = (req, res) => {
    console.log(req.body.email)
    console.log(req.body.password);

 userModel.findOne({email:req.body.email}).then(result=>{
            console.log(result);
            if(!result){
                bcryptjs.hash(req.body.password, 10).then(hash => {
                    let users = new userModel({
                        email:req.body.email,
                        password:hash,
                        userId:shortId.generate()
                    })
                    users.save((err, result) => {
                        if (err) {
                            res.send(err)
                        } else {

                            let resobj = {
                                message:'User Created Success Fully',
                                result:result,
                                err:null,
                                status:200
                            }
                            res.send(resobj)
                        }
                    })
                }).catch(err=>{
                    console.log('error')
                    res.status(500).json({
                        message:'some error occured',
                        result:null,
                        err:err
                    })
                })
            }else{
                console.log('user already existed')
                let resobj = {
                    message:'user already existed',
                    result:null,
                    err:null,
                    status:500
                }
               res.send(resobj)
            }
 }).catch(err=>{
     console.log('error')
     res.status(500).json({
         message:'some error occured',
         result:null,
         err:err
     })
 })
   
}



//user Login
exports.UserLogin = (req,res)=>{
    let userDetails;
    console.log(req.body.email)
userModel.findOne({email:req.body.email}).then(user=>{
    console.log(user)
    if(!user){
    let resobj = {
        message:'no user existed',
        result:null,
        err:null,
        token:null,
        status:404
    }
    return res.send(resobj)
    }
    userDetails=user;
    bcryptjs.compare(req.body.password,user.password).then(isMatch=>{
        console.log(isMatch)
            if(!isMatch){
                    let resobj = {
                    message:'password in correct',
                    result:null,
                    err:null,
                    token:null,
                    status:404
                }
                return res.send(resobj)
            }
   let token=jwt.sign({email:userDetails.email,id:userDetails._id},'complaintsforumproject')
            if(token){
                    let resobj = {
                    message:'login success',
                    result:user,
                    err:null,
                    token:token,
                    status:200
                }
                return res.send(resobj)
            }
    }).catch(err=>{
        console.log(err);
    })

}).catch(err=>{
    console.log(err)
})
}