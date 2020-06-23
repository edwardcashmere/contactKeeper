import {
    ADD_CONTACT,
    UPDATE_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    FILTER_CONTACT,
    CLEAR_FILTER,
    CONTACT_ERROR,
    CLEAR_CONTACT,
    GET_CONTACT
    
} from '../types';

export default (state,action)=>{
    switch(action.type){
        case GET_CONTACT:
            return{
                ...state,
                contacts:action.payload,
                loading:false
            }
        case CLEAR_CONTACT:
            return{
                ...state,
                filtered:null,
                error:null,
                contacts:null,
                current:null
            }
        case ADD_CONTACT:
            return{
                ...state,
                contacts:[action.payload, ...state.contacts]

            }
        case DELETE_CONTACT:
            return{
                ...state,
                contacts:state.contacts.filter(contact=>contact._id !==action.payload),
                loading:false
            }
        case SET_CURRENT:
            return{
                ...state,
                current:action.payload,
                loading:false
            }
        case CLEAR_CURRENT:
            return{
                ...state,
                current:null,
                loading:false
            }
        case UPDATE_CONTACT:
            return{
                ...state,
                contacts:state.contacts.map( contact => contact._id === action.payload._id ?
                    action.payload : contact)
            }
        case FILTER_CONTACT:
            return{
                ...state,
                filtered:state.contacts.filter(contact=>{
                    const regex=new RegExp(`${action.payload}`,"gi");
                    return contact.name.match(regex) || contact.email.match(regex); 
                }),loading:false
            }
        case CLEAR_FILTER:
            return {
                ...state,
                filtered:null,
                loading:false
            }
        case CONTACT_ERROR:
            return {
                ...state,
                error:action.payload,
                loading:false
            }

        default:
            return state
    }
}