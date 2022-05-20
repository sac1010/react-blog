const Blogs = require("../models/blog.model")
const express = require("express")
const router = express.Router()
const {auth} = require("../middlewares/auth")



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
       const page = req.query.page || 1
       const size = 6
        const blogs = await Blogs.find(filter).skip((page-1)*size).limit(size).lean().exec()
        const num = await Blogs.countDocuments().lean().exec()
        const pages = Math.ceil(num/size)
        res.send({blogs, pages:pages})
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

router.delete("/delete/:id", async(req, res)=>{
    try{
        const deleted = await Blogs.findByIdAndDelete(req.params.id)
        res.send("deleted")
    }
    catch(err){
        res.send(err.message)
    }
    
})

router.post("/edit/:id", async(req, res)=>{
    try{
        const blog = await Blogs.findByIdAndUpdate(req.params.id, req.body).lean().exec()
        res.send(blog)
    }
    catch(err){
        res.send(err.message)
    }
    
})


module.exports = router