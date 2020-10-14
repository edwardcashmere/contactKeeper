import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../setAuthToken';
import axios from 'axios';

import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    USER_LOADED,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    CLEAR_ERRORS,
    LOGOUT,
    AUTH_ERROR
}  from '../types';

const AuthState= props =>{
  const  initialState={
        token:localStorage.getItem('token'),
        isAuthenticated:null,
        error:null,
        loading:false,
        user:null
    }

    const [state,dispatch]=useReducer(authReducer,initialState);


const loadUser = async() => {
        //load authtoken
    if(localStorage.token){
            setAuthToken(localStorage.token);
        }
        
        
        
        try {
            const res= await axios.get('/api/auth');
            dispatch({
            type:USER_LOADED,
            payload:res.data
            })
        
        }catch (error) {
            dispatch({
                AUTH_ERROR
            })
            
            }
        
        };
        

//log_in
const login= async formData =>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    try {
        const res =await axios.post('/api/auth',formData,config);
        dispatch({ 
            type: LOGIN_SUCCESS,
            payload: res.data});
            loadUser();
        

    } catch (err) {
        
        dispatch({
            type:LOGIN_FAIL,
            payload:err.response.data.msg
        })
    }

}




//register
const register= async formData =>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    try {
        const res =await axios.post('/api/user',formData,config);
        dispatch({ 
            type: REGISTER_SUCCESS,
            payload: res.data});
            loadUser();
           // console.log(res.data)

    } catch (err) {
        
        dispatch({
            type:REGISTER_FAIL,
            payload:err.response.data.msg
        })
    }

}


//logout

const logOut = () => {
    dispatch({
        type:LOGOUT
    })

};

//clear_eerros
const clearErrors = data => {
    dispatch({type: CLEAR_ERRORS})
};



//load_user


return <AuthContext.Provider
value={{
    isAuthenticated:state.isAuthenticated,
    token:state.token,
    loading:state.loading,
    error:state.error,
    user:state.user,
    register,
    logOut,
    clearErrors,
    loadUser,
    login

}}
>
    {props.children}
</AuthContext.Provider>
}

export default AuthState;