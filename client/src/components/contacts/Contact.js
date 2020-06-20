import React,{Fragment,useContext} from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import { CSSTransition,TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';

 const Contact = () => {
     const contactContext=useContext(ContactContext);
     const { contacts,filtered }=contactContext;
    

    return (
        <Fragment>
            <TransitionGroup>
            { filtered !== null ? filtered.map(contact=>(<CSSTransition key={contact.id} timeout={500} classNames='item'>
                <ContactItem  contact={contact}/></CSSTransition>
            )) : contacts.map(contact=>(
                <CSSTransition key={contact.id} timeout={500} classNames='item'>
                <ContactItem  contact={contact}/> 
                </CSSTransition>))}
            </TransitionGroup>
           
        </Fragment>
    )
}
Contact.propTypes={
    contacts: PropTypes.array
}
export default Contact;