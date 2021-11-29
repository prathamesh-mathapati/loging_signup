const express=require("express")
const router=express.Router()
const bcrypt=require("bcrypt")
const {generateToken,authenticatetoken, authenticateToken}=require('../auth/index')
const knex=require('../Database/index')


router.post("/register",(req,res)=>{
    if(req.body.email===undefined || req.body.password===undefined ){
        res.send({"suggestion":"email and password both are require"})}
    else{
    knex.select("*").from("user").where({email:req.body.email}).then((data)=>{
        if(data.length<1){
            knex("user").insert({name:req.body.name,email:req.body.email,password:bcrypt.hashSync(req.body.password,10)}).then((data)=>{
                res.send({'massage':'data insert'})
            }).catch((err)=>{
                res.send(err.massage)
            })
        }else{
            res.send("data already exist")
        }
    })
}
})

router.post("/login", (req, res) => {
    if(req.body.email === undefined || req.body.password === undefined){
        res.send({"suggetion": "email and password both are require!"})}
    else{   
    knex.select("*").from("test").where({'email':req.body.email}).then((data) => {
        console.log(data);
        var password=bcrypt.compareSync(req.body.password,data[0].password)
        console.log(password)
        if (password){
            const token=generateToken(req.body).split("=")[0]
           
            res.cookie("token",token).send(data)
        }else{
            res.send("Invalid email or password")
        }
    }).catch((err) => {
        res.send(err.massage)
    })}
})


module.exports=router