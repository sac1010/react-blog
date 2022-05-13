const mongoose = require("mongoose")

 const connectDb = ()=>{
    mongoose.connect("mongodb+srv://sac101:sac123@cluster0.g2o0e.mongodb.net/Blog?retryWrites=true&w=majority")
 }

 module.exports = connectDb

