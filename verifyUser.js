const jwt =require("jsonwebtoken");
const config=require("config");




module.exports=(req,res,next)=>{


const token =req.header('auth');
if(!token){
    return res.status(400).json({msg:'access forbiden'})
}
try{
    const validToken=jwt.verify(token,config.get("secret"));
    validToken=req.user;
    next();


}catch(err){
    res.status(400).json({msg:"invalid token"})
}


}