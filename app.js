const appconfig = require('./appconfig')
const path =require('path')
const express = require('express');
let app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: false}))
app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET,DELETE")
    next();
})
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
 
const userRouter = require('./Modules/user/user.router')
const complaintRouter = require('./Modules/complaint/complaint.router')
app.use('/user',userRouter)
app.use('/complaint',complaintRouter)




mongoose.connection.on('error', function(err) {
    if(err) {
        console.log(err)
    }
})

mongoose.connection.on('open', function(err) {
    if(err) {
        console.log(err)

    } else {
        console.log('connection successful')
    }
})


app.listen(appconfig.port,()=>{
    let db = mongoose.connect(appconfig.db.url, ({ useNewUrlParser: true }))
    console.log('Port is running in ' + appconfig.port)
});