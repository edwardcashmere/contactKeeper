import React,{useReducer} from 'react';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import { v4 as uuidv4 } from 'uuid';

import {
    ADD_CONTACT,
    UPDATE_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    FILTER_CONTACT,
    CLEAR_FILTER
    
} from '../types';

const ContactSate= props=>{
    const initalState={
        contacts:[
            {
                id:1,
                name:'sarah conor',
                email:'sarah@term.com',
                phone:'111-111-111',
                type:'personal'
            },
            {
                id:2,
                name:'kobe bryant',
                email:'bryanth@laker.com',
                phone:'222-222-222',
                type:'professional'
            },
            {
                id:3,
                name:'Jeff Shreeves',
                email:'Jeff@ea.com',
                phone:'333-333-333',
                type:'personal'
            }
            
        ],
        current:null,
        filtered:null
    }
    const [state,dispatch]=useReducer(contactReducer,initalState);
    

    //Add Contactct
    const addContact=(contact)=>{
        contact.id=uuidv4();
        dispatch({
            type:ADD_CONTACT,
            payload:contact
        })
    }


    //Delete Contact
    const deleteContact=(id)=>{
        dispatch({
            type:DELETE_CONTACT,
            payload:id
        })
    }

    //Update Contact
    const updateContact=contact=>{
        dispatch({
            type:UPDATE_CONTACT,
            payload:contact
        });
    }


    //Set current
    const setCurrent=(contact)=>{
        dispatch({
            type:SET_CURRENT,
            payload:contact
        })

    }
  //clear current

const clearCurrent=()=>{
        dispatch({
            type:CLEAR_CURRENT,
        })

    }




    //filter contacts
const setFilter=(text)=>{
    dispatch({
        type:FILTER_CONTACT,
        payload:text

    })
}


    //clear filter
    const clearFilter=()=>{
        dispatch({
            type:CLEAR_FILTER,
            
    
        })
    }
    

    return (
        <ContactContext.Provider
        value={{
            contacts:state.contacts,
            current:state.current,
            filtered: state.filtered,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            setFilter,
            clearFilter
            
        }}
        >
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactSate