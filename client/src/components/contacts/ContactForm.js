import React,{useState,useContext,useEffect} from 'react';
import ContactContext from "../../context/contact/contactContext";

const ContactForm = () => {
    const contactContext=useContext(ContactContext)
    const [contact,setContact]=useState({
        name:'',
        email:'',
        phone:'',
        type:'personal'
    });
    const { current,addContact,clearCurrent,updateContact }=contactContext
    const onChange=e=>setContact({ ...contact, [e.target.name] : e.target.value})
    const {name,email,phone,type}=contact;
    const onSubmit=(e)=>{
        e.preventDefault();
        if( current == null){
            addContact(contact);
            setContact({
                name:'',
                email:'',
                phone:'',
                type:'personal'
            })

        }else{
            updateContact(contact);
            clearCurrent();


        };
        
        
    

        

    }
    useEffect(()=>{
        if(current !== null){
            setContact(current);
        }else{
            setContact({
                name:'',
                email:'',
                phone:'',
                type:'personal'
            })
        }
    },[contactContext,current]);
    const onClear=()=>{
        clearCurrent()
    };
    return (
        <form onSubmit={onSubmit}>
            <h3 className="text-primary">{current ? 'Edit Contact':'Add contact'}</h3>
            <input type="text" name='name' value={name} placeholder='name' onChange={onChange} />
            <input type="text" name='email' value={email} placeholder='email' onChange={onChange} />
            <input type="text" name='phone' value={phone} placeholder='phone' onChange={onChange} />
            <h5>Contact type</h5>
            <input type="radio" name="type" value="personal"onChange={onChange}  checked={type === 'personal'}/>personal{' '}
            <input type="radio" name="type" value="professional"onChange={onChange}  checked={type === 'professional'}/>professional
            <div>
                <input type="submit" value={current ? 'Update Contact':'Add Contact'}  className="btn btn-primary btn-block"/>
            </div>
            { current && (<div>
                <button className="btn btn-light btn-block" onClick={onClear}>Clear</button>
                </div>)}

            
        </form>
    )
}
export default ContactForm;
