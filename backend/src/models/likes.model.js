const { Schema, model} = require('mongoose')
const mongoose = require("mongoose")
const likesSchema = new Schema(
    {

        postId:{type:mongoose.Schema.ObjectId, ref:"blogs", required:true},
        userId:{type:mongoose.Schema.ObjectId, ref:"user", required:true}
    },
    {
        versionKey : false,
        timestamps:true
    }
)
module.exports = model('likes', likesSchema)