const User = require('../models/userModel')

const jwt = require('jsonwebtoken')

// we are passing in id because it's going to be part of the payload in jwt
const createToken = (_id) => {
   return jwt.sign({_id:_id}, process.env.SECRET, {expiresIn: '3d'})
}

const loginUser = async (req,res) => {
   const {email, password } = req.body
   try {
      const user = await User.login(email, password)

      console.log(user._id)
      const token = createToken(user._id)
       
      // res.status(200).json({email, user})
      res.status(200).json({email, token})
  } catch (error) {
     res.status(400).json({error: error.message}) 
  }
}

const signupUser = async (req,res) => {
    const {email, password } = req.body

    try {
        const user = await User.signup(email, password)
        const token = createToken(user._id)
       
        // res.status(200).json({email, user})
        res.status(200).json({email, token})
    } catch (error) {
       res.status(400).json({error: error.message}) 
    }
   
 }


 module.exports = {
    loginUser,
    signupUser
 }