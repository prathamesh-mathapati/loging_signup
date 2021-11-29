const express =require("express")
require('dotenv').config()
const app=express()
const home= require("./routes/index")
app.use(express.json())
app.use("/",home)
const port=process.env.port
app.get("/",(req,res)=>{
    res.send('connecting')
})
app.listen(port,()=>{
    console.log(`server listening port No. ${port}`);
})