const Blogs = require("../models/blog.model")
const express = require("express")
const router = express.Router()
const {auth} = require("../middlewares/auth")

// router.get("/blogs", async(req, res)=>{
//     try{
//         const blogs = await Blogs.find().lean().exec()
//         res.send(blogs)
//     }
//     catch(err){
//         res.send(err.message)
//     }
    
// })

router.get("/blog/:id", async(req, res)=>{
    try{
        const blogs = await Blogs.findById(req.params.id).lean().exec()
        res.send(blogs)
    }
    catch(err){
        res.send(err.message)
    }
    
})

router.post("/", auth, async (req,res)=>{
    try{
        req.body.userId = req.user._id
        const blog = await Blogs.create(req.body)
        return res.status(201).send(blog);
                
    }
    catch(er){
        return res.status(500).send(er.message);
    }
})


router.get("/", async(req, res)=>{
    try{
       const filter = {}
       if(req.query.category){
           filter.category = req.query.category
       }
        const blogs = await Blogs.find(filter).lean().exec()
        res.send(blogs)
    }
    catch(err){
        res.send(err.message)
    }
    
})

router.get("/last", async(req, res)=>{
    try{

        const blogs = await Blogs.find().sort('-date').limit(3).lean().exec()
        res.send(blogs)
    }
    catch(err){
        res.send(err.message) 
    }
    
})

router.get("/user/:id", async(req, res)=>{
    try{

        const blogs = await Blogs.find({"userId":req.params.id}).lean().exec()
        res.send(blogs)
    }
    catch(err){
        res.send(err.message) 
    }
    
})


module.exports = router