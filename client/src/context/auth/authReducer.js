import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    USER_LOADED,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    CLEAR_ERRORS,
    LOGOUT,
    AUTH_ERROR,
}  from '../types';

export default (state,action)=>{
    switch(action.type){
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated:true,
                loading:false,
                user:action.payload

            }
        
            
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token',action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated:true,
                loading:false
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
            localStorage.removeItem('token')
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload
                
            }
        case AUTH_ERROR:
        case LOGOUT:
        
            localStorage.removeItem('token')
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload
                
            }
            case CLEAR_ERRORS:
                return{
                    ...state,
                    error:null
                }
        default:
            return state
    }
}