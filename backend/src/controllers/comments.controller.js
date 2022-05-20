const Comments = require("../models/comments.model")
const express = require("express")
const router = express.Router()
const {auth} = require("../middlewares/auth")

router.get("/:postId", async(req, res)=>{
    try{
        const comments = await Comments.find({postId:req.params.postId}).populate("userId").limit(10).lean().exec()
        res.status(201).send(comments)
    }
    catch(err){
        res.status(404).send(err.message)
    }  
     
})

router.post("/", async(req, res)=>{
    try{
        const comment = await Comments.create(req.body)
        res.status(201).send(comment)
    }
    catch(err){
        res.status(404).send(err.message)
    }  
     
})

router.delete("/:commentId", async(req, res)=>{
    try{
        const comment = await Comments.findByIdAndDelete(req.params.commentId)
        res.status(201).send({deleted:comment})
    }
    catch(err){
        res.status(404).send(err.message)
    }  
     
})

module.exports = router