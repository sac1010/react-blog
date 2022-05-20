const { Schema, model} = require('mongoose')
const mongoose = require("mongoose")
const commentsSchema = new Schema(
    {
        comment:{type:String, required:true},
        postId:{type:mongoose.Schema.ObjectId, ref:"blogs", required:true},
        userId:{type:mongoose.Schema.ObjectId, ref:"user", required:true},
        
    },
    {
        versionKey : false,
        timestamps:true
    }
)
module.exports = model('comments', commentsSchema)