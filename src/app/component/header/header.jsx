import React from 'react';
import NavBar from '../navBar';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './header.css';
import logo from '../../img/pizza.png';

const Header = () => {
    return (
        <header>
            <div className='container'>
                <div className='header__inner'>
                    <div className='header__logo'>
                        <img alt='' className='header__logo__img' src={logo}/>
                       Mondo Pizza
                    </div>
                    <NavBar/>
                    <div className='header__btn__icons'>
                        <button className='header__btn'>
                            <i className="bi bi-search"></i>
                        </button>
                        <button className='header__btn'>
                            <i className="bi bi-cart"></i>
                        </button >
                        <button className='headet__btn__login'>Sing In</button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
