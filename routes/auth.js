const router=require('express').Router();



//post login route
router.post('/',(req,res)=>{
    res.send("logged in")
});



module.exports=router;