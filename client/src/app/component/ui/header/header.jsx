import React from 'react';
import NavBar from '../../navBar';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './header.css';
import logo from '../../../img/pizza.png';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsLoggedIn, getUserById } from '../../../store/slices/userSlice';
import localStorageService from '../../../services/localStorage.service';

const Header = () => {
    const { cartTotalQuantity } = useSelector((state) => state.cart);
    const userId = localStorageService.getUserId();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const user = useSelector(getUserById(userId));
    return (
        <header className='header'>
            <div className='container'>
                <div className='header__inner'>
                    <div className='header__logo'>
                        <img alt='' className='header__logo__img' src={logo}/>
                            Mondo Pizza
                    </div>
                    <NavBar/>

                    {isLoggedIn && user
                        ? <div className='header__btn__icons'>
                            <h5 className='header__user__name'> Welcome, {user.name} </h5>
                            <Link to="/cart">
                                <button className='header__btn__login'>
                                    <i className="bi bi-cart"></i>
                                    <span className="bag-quantity">
                                        <span>{cartTotalQuantity}</span>
                                    </span>
                                </button >
                            </Link>
                            <NavLink to='/logOut' className='nav__link'>
                                <button className='header__btn__login'> Log Out</button>
                            </NavLink>
                        </div>

                        : <div className='header__btn__icons'>
                            <Link to="/cart">
                                <button className='header__btn__login'>
                                    <i className="bi bi-cart"></i>
                                    <span className="bag-quantity">
                                        <span>{cartTotalQuantity}</span>
                                    </span>
                                </button >
                            </Link>
                            <NavLink to='/login' className='nav__link'>
                                <button className='header__btn__login'> Sign in</button>
                            </NavLink>
                        </div>
                    }
                </div>
            </div>
        </header>

    );
};

export default Header;
