const config=require('config');
const jwt=require('jsonwebtoken');


module.exports=(req,res,next)=>{
    const token=req.header('x-auth-token');

    if(!token) return res.status(401).json({msg:'access forbiden'});

    try {
        const decoded=jwt.verify(token,config.get('secret'));
        req.user=decoded.user;
        next()
        
    } catch (error) {
        res.status(400).json({msg:'session expired'})
    }
}