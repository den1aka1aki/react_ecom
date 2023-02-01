import React from 'react';
import NavBar from '../../navBar';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './header.css';
import '../../common/Button/button.css';
import logo from '../../../img/pizza.png';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from '../../../store/slices/userSlice';
import Button from '../../common/Button/button';

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
                            <NavLink className='nav__link' to="/cart">
                                <Button className='header__btn' label={<i className="bi bi-cart"> {cartTotalQuantity} </i>}/>
                            </NavLink>
                            <NavLink to='/logOut' className='nav__link'>
                                <Button className='header__btn' label={'Log Out'}></Button>
                            </NavLink>
                        </div>

                        : <div className='header__btn__icons'>
                            <NavLink className='nav__link' to="/cart">
                                <Button className='header__btn' label={<i className="bi bi-cart"> {cartTotalQuantity} </i>}/>
                            </NavLink>
                            <NavLink to='/login' className='nav__link'>
                                <Button className='header__btn' label={'Sign In'}/>
                            </NavLink>
                        </div>
                    }
                </div>
            </div>
        </header>

    );
};

export default Header;
