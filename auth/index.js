const jwt =require("jsonwebtoken")
const generateToken=(data)=>{
    const token =jwt.sign({data},"scretkey")
    return token
}
const authenticateToken=(req,res,next)=>{
    if (req.headers.cookie){
        const token =req.headers.cookie.split("=")[1]
        const decoded=jwt.verify(token,"scretkey")
        req.usedata=decoded
        next()
    }else{
        req.usedata='not have cookies'
        next()
    }
}

module.exports={generateToken,authenticateToken}