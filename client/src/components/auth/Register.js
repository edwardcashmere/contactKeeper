import React, { useState,useContext,useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';




const Register = (props) => {
    const alertContext=useContext(AlertContext);
    const authContext=useContext(AuthContext);
    const { setAlert } =alertContext;
    const { register,error,clearErrors,isAuthenticated } = authContext;
    useEffect(()=>{
        if(isAuthenticated){
            props.history.push('/')
        }
        if( error === "user already exists"){
            setAlert(error,'danger');
            clearErrors()

        }
        //eslint-disable-next-line
    },[error,isAuthenticated,props.history])
    
    const [user,setUser]=useState({
        name:'',
        email:'',
        password:'',
        password2:''
    })

    const { name,email,password,password2 } =user;
    const onChange= e => setUser({ ...user ,[e.target.name]:e.target.value});
    const onSubmit = e =>{
        e.preventDefault();
        if(name === '' || email === '' || password === ''){
            setAlert('Please fill all fields','danger')

        }else if( password !== password2 ){
            setAlert('Passwords do not match','danger')
        }else{
           register({
               name,email,password
            })
            
        }
    }
    return (
        <div className='form-container'>
            <h1> Account <span className='text-primary'> Register</span></h1>
            <form action="" onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor="name">Name</label>
                    <input type="text" name='name'value={name} required onChange={onChange}/>
                </div>
                <div className='form-group'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' value={email} required onChange={onChange}/>
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' value={password} minLength='6' required onChange={onChange}/>
                </div>
                <div className='form-group'>
                    <label htmlFor="password2">Confirm_Password</label>
                    <input type="password" name='password2' value={password2} minLength='6' required onChange={onChange}/>
                </div>
                <input type="submit" value='Submit' className='btn btn-primary btn-block'/>
    
            </form>
            
        </div>
    )
}
 export default Register;