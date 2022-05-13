const { Schema, model} = require('mongoose')
const mongoose = require("mongoose")
const blogsSchema = new Schema(
    {
        title: {type: String, required:true  },
        date:{type:String},
        imgUrl:{type:String},
        description:{type:String, required:true},
        category:{type:String, required:true},
        userId:{type:mongoose.Schema.ObjectId, ref:"user", required:true}
    },
    {
        versionKey : false,
        timestamps:true
    }
)
module.exports = model('blogs', blogsSchema)