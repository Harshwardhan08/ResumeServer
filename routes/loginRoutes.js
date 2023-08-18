const express = require('express')
const router = express.Router()
const loginController = require('../controllers/loginController')

router.route('/')
    .post(loginController.loginValidate)

module.exports = router