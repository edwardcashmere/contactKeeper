import React,{ Fragment ,useContext } from 'react';
import PropTypes from 'prop-types';
import AuthContext from '../../context/auth/authContext';
import {Link} from 'react-router-dom';


const Navbar = ({icon,title}) => {
    const authContext=useContext(AuthContext);

    const { isAuthenticated, user, logOut } = authContext;

    const onClick=()=>{
        logOut()
    }

    const authlinks=(
        <Fragment>
            
            <li>Hello { user && user.name }</li>
            <li>
                <a onClick={onClick} href="#!">
                <i className="fas fa-sign-out-alt"></i>
               <span className="hide-sm">Logout</span>
                </a>
            </li>

        </Fragment>
    )
    const guestLinks=(
        <Fragment>
            <li>
                 <Link to='/register'>Register</Link>
            </li>
            <li>
                 <Link to='/login'>Login</Link>
            </li>


        </Fragment>
    )
    return (
        <div className='navbar bg-primary'>
            <h1>
                <i className={icon}></i>{title}
            </h1>
            <ul>
                { isAuthenticated ? authlinks : guestLinks}
                
            </ul>
            
        </div>
    )
}
Navbar.propTypes={
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
}

Navbar.defaultProps={
    title:'Contact keeper',
    icon:'fas fa-id-card-alt'
}
export default Navbar