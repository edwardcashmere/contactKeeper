const router=require('express').Router();
const bcrypt=require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt=require("jsonwebtoken");
const config=require("config");
const User=require('../models/User');
const auth=require('../middlewares/auth');





//private
router.get('/',auth,async(req,res)=>{
    try {
        let user= await User.findById(req.user.id).select("-password");
        res.json({user});
    
    } catch (error) {
        res.status(400).json({error:error.message})
        
    }
})


//public
//post login route
router.post('/',[
    check('email','this input must be a valid email').isEmail(),
    check('password','please enter a valid password').exists()
]
,async(req,res)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors:errors.array()});

    let {email, password}=req.body;

    try{
    let user=await User.findOne({email});
    if(!user) return res.status(400).json({msg:"Invalid credentials"});

    let isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch) return res.status(400).json({msg:"invalid credentials"});

    payload={
        user:{
            id:user.id
        }
    }
    
    jwt.sign(payload,config.get("secret"),{expiresIn:36000},
    (err,token)=>{
        if(err) throw err;
        res.json({token})
    })}catch(err){
        res.status(400).json({error:err.message})
    }


   // res.send("logged in")
});



module.exports=router;