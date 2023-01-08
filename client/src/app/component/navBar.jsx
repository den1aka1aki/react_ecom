import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <>
            <nav className="nav">
                <NavLink exact to='/' className='nav__link' >Home</NavLink>

                <NavLink to='/menu' className='nav__link ' >Menu</NavLink>

                {/* {isLoggedIn && */}
                {/* <NavLink to='/manager' className='nav__link' >Manager Web Page</NavLink> */}
                {/* } */}
            </nav>
        </>
    );
};

export default NavBar;
