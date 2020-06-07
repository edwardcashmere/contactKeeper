const router=require('express').Router();
const User=require('../models/User');
const Contact=require('../models/Contact');
const auth=require('../middlewares/auth');
const { check, validationResult } = require('express-validator');



//get all contacts
router.get('/',auth,async(req,res)=>{
    try {
        const contacts= await Contact.find({user:req.user.id}).sort({date:-1})
        res.json(contacts);
    } catch (error) {
        res.status(500).send(error.message)
        
    }

  //  res.send('get all contacts')
});
//add contacts
router.post('/',[auth,[
    check('name','name can not be empty').not().isEmpty(),
    check('phone','phone can not be empty').not().isEmpty()
]],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()) return res.json({error:errors.array()});

    const{name,phone,email,type}=req.body;
    try {
        const contact=await new Contact({name,phone,email,type,user:req.user.id

        });
        await contact.save();
        res.json(contact);
    
        
    } catch (error) {
        console.log(error.message)
    res.status(500).send('internal server error')        
    }
   
    //res.send('add contacts')
});

//update contacts
router.put('/:id',auth,async(req,res)=>{
const {name,phone,email,type}=req.body;

const contactDetails={};
//check what was passed in and push to object
if(name)  contactDetails.name=name;
if(phone)  contactDetails.phone=phone;
if(email)  contactDetails.email=email;
if(type)  contactDetails.type=type;

try {
    //check if contact exists
    let  contact=await Contact.findById(req.params.id);
    if(!contact) return res.status(404).json({msg:'contact not found'})

    //check the contact belongs to the user
    if (contact.user.toString()!==req.user.id) return res.status(401).json({msg:"you dont have the right for this request"});

     contact=await Contact.findByIdAndUpdate(req.params.id,{$set:contactDetails},{new:true});
     res.json(contact);

    
} catch (error) {
    console.log(error);
    res.status(500).send('internal server error')
    
}
    //res.send('update contacts')
});

router.delete('/:id',auth,async(req,res)=>{
try {

    //find contact
    let contact= await Contact.findById(req.params.id);
    if(!contact) return res.status(404).json({msg:'contact not found'});

    //check owner of the contact

    if(contact.user.toString()!== req.user.id) return res.status(401).json({msg:'you dont have the rights for this'});

    await Contact.findByIdAndRemove(req.params.id);
    res.json({msg:'contact deleted'})

    
} catch (error) {
    console.log(error.message);
    res.status(500).send('Internal Server Error')
    
}
    //res.send('deleted')

});


module.exports=router;