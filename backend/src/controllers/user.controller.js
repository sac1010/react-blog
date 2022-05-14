const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

const newToken = (user)=>{
    return jwt.sign({user},"Sac1010")
}

const register = async (req, res)=>{
    try {
        let user = await User.findOne({email : req.body.email })
        
        if(user)
            return res
            .status(404)
            .send({
                status : 0,
                reason : "User already exits"
            })
        user = await User.create(req.body)
        return res
        .status(200)
        .send({
            status : 1
        })
    } catch (error) {
        return res
        .status(500)
        .send({
            status : 0,
            reason : error.message
        })   
    }
}

const login =  async (req, res)=>{

    try {
        let user = await User.findOne({email : req.body.email})
        if(!user)
            return res
            .status(404)
            .send({
                status : 0
            })   
        const status = user.checkPassword(req.body.password)
        if(!status)
            return res
            .status(404)
            .send({
                status : 1
            })
        const token = newToken(user)
        return res
        .status(201)
        .send({token, status : 1})
    } catch (error) {
        return res
        .status(500)
        .send({
            status : 0,
            reason : error.message
        })
    }
}

module.exports = { register, login}