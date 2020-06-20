import React, { useContext,useRef,useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

 const FilteredContacts = () => {

    const contactContext =useContext(ContactContext);
    const { filtered,setFilter,clearFilter } = contactContext;
    const text =useRef('');
    useEffect(()=>{
        if (filtered === null){
            text.current.value='';
       //eslint-disable-next-line
    }},[])



    const onChange = e =>{
        if (text.current.value !== ''){
            setFilter(e.target.value);
        }else{
            clearFilter();
        }
        
    }
    return (
        <form>
            <input type="text" ref={text} placeholder="filter contacts" onChange={onChange}/>
            
        </form>
    )
}

export default FilteredContacts;
