const express = require("express")
const connectDb = require("./config/db")
const app = express()
const register = require("./controllers/userController")


app.use(express.json())
app.use("/signup", register)

app.listen(3000, async()=>{
  try{
      await connectDb()
      console.log(`running on port 3000`)
  }catch(e){
      console.log(e.message)
  }
})