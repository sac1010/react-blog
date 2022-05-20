const express = require("express")
const connectDb = require("./src/configs/db")
const app = express()
const blogsController = require("./src/controllers/blogs.controller")
const likesController = require("./src/controllers/likes.controller")
const commentsController = require("./src/controllers/comments.controller")
const {login, register} = require("./src/controllers/user.controller")
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use("/blogs", blogsController) 
app.use("/login", login)
app.use("/register", register)
app.use("/likes", likesController)
app.use("/comments", commentsController)

const PORT = process.env.PORT || 3001 

app.listen(PORT, async()=>{
  try{
      await connectDb()
      console.log(`running on port 3001`) 
  }catch(e){
      console.log(e.message)
  }
})