const router=require('express').Router();



//get all contacts
router.get('/',(req,res)=>{
    res.send('get all contacts')
});
//add contacts
router.post('/',(req,res)=>{
    res.send('add contacts')
});

//update contacts
router.put('/',(req,res)=>{
    res.send('update contacts')
});

router.delete('/',(req,res)=>{
    res.send('deleted')

});


module.exports=router;