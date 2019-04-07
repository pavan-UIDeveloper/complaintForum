const express = require('express')
const router = express.Router();

const signUpController = require('./user.controller')
router.post('/signUp',signUpController.UserSignUp)
router.post('/login',signUpController.UserLogin)
module.exports = router;
