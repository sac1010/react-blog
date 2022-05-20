const Likes = require("../models/likes.model")
const express = require("express")
const router = express.Router()
const {auth} = require("../middlewares/auth")

router.get("/:postId", async(req, res)=>{
    try{
        const likes = await Likes.countDocuments({postId:req.params.postId}).lean().exec()
        res.status(201).send({likes:likes})
    }
    catch(err){
        res.status(404).send(err.message)
    }  
     
})

// router.get("/get/allLikes", async(req, res)=>{
//     try{
//         const likes = await Likes.find().lean().exec()
//         res.status(201).send(likes)
//     }
//     catch(err){
//         res.status(404).send(err.message)
//     } 
     
// })

router.post("/like", async(req, res)=>{

    try{
        const isLiked = await Likes.findOne({userId:req.body.userId, postId:req.body.postId}).lean().exec()
        if(isLiked){
            const remove = await Likes.findOneAndRemove({userId:req.body.userId, postId:req.body.postId})
            const likes = await Likes.countDocuments({postId:req.body.postId}).lean().exec()
          return res.send({likes})
        }
        const like = await Likes.create(req.body)
        const likes = await Likes.countDocuments({postId:req.body.postId}).lean().exec() 
        res.send({likes:likes})
        
    }
    catch(err){
        res.send(err.message)
    }
    
})

router.get("/isLiked/:userId/:postId", async(req, res)=>{
    try{
        const isLiked = await Likes.findOne({userId:req.params.userId, postId:req.params.postId}).lean().exec()
        if(isLiked){
            return res.send({liked:true})
        } 
        return res.send({liked:false})
    }
    catch(err){
        res.status(404).send(err.message)
    } 
     
})

module.exports = router