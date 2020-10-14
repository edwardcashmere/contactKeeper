const router=require('express').Router();
const User=require('../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs');
const config=require("config");
const jwt=require("jsonwebtoken");


//register users
router.post('/',
[
    check('name','please add a name').not().isEmpty(),
    check('email','input a valid email').isEmail(),
    check('password','passowrd must be longer than 6 characters').isLength({min:6})
]
,async(req,res)=>{

    try{
        const errors=validationResult(req);
    if(!errors.isEmpty()){
      return  res.status(400).json({error:errors.array()})

    }
   const  {name,email}=req.body;
    
    const userExists= await User.findOne({email:email});
    if(userExists){
        return res.status(400).json({msg:'user already exists with this email'})
    };
    const salt=await bcrypt.genSalt(10);
    const password=await bcrypt.hash(req.body.password,salt);

    let user= await new User({
        name,
        email,
        password
    });
      await user.save()
    const payload={
        user:{
            id:user.id
        }
    }
   // console.log(user);
    //console.log(payload);
    // const token=jwt.sign(payload,config.get("secret"),{expiresIn:3600})
    // res.header('auth',token).send(token);
   // res.send(savedUser)
    jwt.sign(payload,config.get("secret"),{expiresIn:36000},
    (err,token)=>{
        if(err) throw err;
        res.json({token})
    })
    //res.send("passed")

        
    }catch(err){
        console.log(err.message)
        res.status(500).send(err.message)
    }
});


module.exports=router;