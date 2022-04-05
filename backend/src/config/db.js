const mongoose = require("mongoose")


const connectDb = ()=>{
    mongoose.connect(`mongodb+srv://sac101:sac123@cluster0.g2o0e.mongodb.net/Blog?authSource=admin&replicaSet=atlas-vaw5na-shard-0&readPreference=primary&ssl=true`)
}

module.exports =connectDb 