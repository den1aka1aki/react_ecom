import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <>
            <nav className="nav">
                <Link to='/' className='nav__link active' aria-current="page" >Home</Link>

                <Link to='/menu' className='nav__link' >Menu</Link>

                <Link to='/delivery' className='nav__link' >Delivery</Link>

                <Link to='/about' className='nav__link' >About</Link>

                <Link to='/blog' className='nav__link' >Blog</Link>
            </nav>
        </>
    );
};

export default NavBar;
