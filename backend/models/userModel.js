const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
})

// static signup method
userSchema.statics.signup = async function (name, email, password) {
    // validatoion
    // if the user didnt enter password or email
    if (!email || !password || !name) {
        
        throw Error('All fields must be filled')
    }
    // to check if th email is valid
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    // to check if the password is strong
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }


    // this first before validation
    const emailExist = await this.findOne({ email })

    if (emailExist) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    // password: hash.... the value of the password is set to hash
    const user = await this.create({name, email, password: hash})

    return user
}

userSchema.statics.login = async function (email,password) {

    if (!email || !password) {
        
        throw Error('All fields must be filled')
    }
    
    const userExist = await this.findOne({ email })

    if (!userExist) {
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, userExist.password)

    if (!match) {
        throw Error ('Incorrect password')
    }
    return userExist
}

module.exports = mongoose.model('User', userSchema)
