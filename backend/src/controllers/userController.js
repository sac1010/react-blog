const User = require("../models/user.model")

const register = async(req, res)=>{
    try{
        const user = await User.create(req.body)
        res.status(200).send(user)
    }catch(e){
        res.status(500).send(e.message)
    }
}

module.exports = register