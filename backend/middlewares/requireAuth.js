const jwt = require('jsonwebtoken')
const User = require('../models/exerciseModel')

const requireAuth = async (req, res, next) => {


    // verify authetication.... the headers has an authorization property

    const { authorization } = req.headers

    if (!authorization) {
        return res.status(404).json({error: 'Authorization token required'})
    }
// the authorization looks like this ('Bearer  'token'). we splitted because we need token alone
// 'Bearer jjljghjfyiouijl;l,m587'. The split method removes the 'Bearer' and leaves the token
const token = authorization.split(' ')[1]
    try {
       const {_id} = jwt.verify(token, process.env.SECRET)

       // this get the user id alone
       req.user = await User.findOne({ _id }).select("_id")
       next()
       
    } catch (error) {
        console.log(error);
        res.status(401).json({error: 'Request is not authorized'})
    }
}

module.exports = requireAuth