import React,{ useContext, useEffect } from 'react';
import Contact from '../contacts/Contact';
import ContactForm from '../contacts/ContactForm';
import FilteredContacts from '../contacts/FilteredContacts';
import AuthContext from '../../context/auth/authContext';

 const Home = () => {
     const authContext=useContext(AuthContext);
     const { loadUser } = authContext;
     useEffect(()=>{
         loadUser();
         //eslint-disable-next-line
     },[])
    return (
        <div className='grid-2'>
            <div>
                <ContactForm />
            </div>
            <div>
                <FilteredContacts />
                <Contact />
            </div>
            
        </div>
    )
}
export default Home;
