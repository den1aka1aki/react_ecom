import React from 'react';
import NavBar from '../../navBar';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './header.css';
import logo from '../../../img/pizza.png';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from '../../../store/slices/userSlice';

const Header = () => {
    const { cartTotalQuantity } = useSelector((state) => state.cart);
    const isLoggedIn = useSelector(getIsLoggedIn());
    return (
        <header className='header'>
            <div className='container'>
                <div className='header__inner'>
                    <div className='header__logo'>
                        <a className='header__logo__link' href='/'>
                            <div className='header__logo__component'>
                                <img alt='img' className='header__logo__img' src={logo}/>
                                <h1 className='header__logo__title'>Mondo Pizza</h1>
                            </div>
                        </a>
                    </div>
                    <NavBar/>

                    {isLoggedIn
                        ? <div className='header__btn__icons'>
                            <Link to="/cart">
                                <button className='btn'>
                                    <i className="bi bi-cart"></i>
                                    <span className="bag-quantity">
                                        <span>{cartTotalQuantity}</span>
                                    </span>
                                </button >
                            </Link>
                            <NavLink to='/logOut' className='nav__link'>
                                <button className='btn'> Log Out</button>
                            </NavLink>
                        </div>

                        : <div className='header__btn__icons'>
                            <Link to="/cart">
                                <button className='btn'>
                                    <i className="bi bi-cart"></i>
                                    <span className="bag-quantity">
                                        <span>{cartTotalQuantity}</span>
                                    </span>
                                </button >
                            </Link>
                            <NavLink to='/login' className='nav__link'>
                                <button className='btn'> Sign in</button>
                            </NavLink>
                        </div>
                    }
                </div>
            </div>
        </header>

    );
};

export default Header;
