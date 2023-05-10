const express = require('express')
const router = express()
const {
    loginUser,
    signupUser, 
    // sendMail,
    // sendMailTwo,

} = require('../controllers/userController')

router.post('/login', loginUser)

router.post('/signup', signupUser)

// router.post('/sendmail', sendMail)

// router.post('/sendmailtwo', sendMailTwo)


module.exports = router