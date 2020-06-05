const router=require('express').Router();

//register users
router.post('/',(req,res)=>{
    res.send("register route")
});


module.exports=router;