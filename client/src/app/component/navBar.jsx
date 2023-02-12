import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <>
            <nav className="nav">
                <NavLink exact to='/' className='nav__link' >Home</NavLink>
                <NavLink to='/menu' className='nav__link ' >Menu</NavLink>
                <NavLink to='/delivery' className='nav__link' >Delivery</NavLink>
                <NavLink to='/about' className='nav__link' >About</NavLink>
            </nav>
        </>
    );
};

export default NavBar;
