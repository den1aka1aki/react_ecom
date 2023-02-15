import React, { useEffect, useState } from 'react';
import backArrow from '../../../img/arrow-left.png';
import './cart.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCar, clearCart, decreaseCart, getTotals, removeFromCart } from '../../../store/slices/basketSlice';
import { Link, NavLink } from 'react-router-dom';
import { getIsLoggedIn } from '../../../store/slices/userSlice';
import { toast } from 'react-toastify';
import ModalWindow from '../../common/ModalWindow/modalWindow';
import Button from '../../common/Button/button';

const Cart = () => {
    const [isOpen, setIsOpen] = useState(false);
    const isLoggedIn = useSelector(getIsLoggedIn());
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);

    const handleAddToCart = (product) => {
        dispatch(addToCar(product));
    };
    const handleDecreaseCart = (product) => {
        dispatch(decreaseCart(product));
    };
    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
    };
    const handleClearCart = () => {
        dispatch(clearCart());
    };
    const handlePlaceTheOrder = () => {
        toast.success('Thank you for your order', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
        });
        setIsOpen(true);
    };
    return (
        <div className="container">
            <div className="cart-container">
                <h2 className='cart_container_main_title'>Shopping Cart</h2>
                {cart.cartItems.length === 0
                    ? (
                        <div className="cart-empty">
                            <p>Your cart is currently empty</p>
                            <div className="start-shopping">
                                <Link to="/menu">
                                    <img className = 'cart_arrows' src={backArrow} alt=""/>
                                    <span>Start Shopping</span>
                                </Link>
                            </div>
                        </div>
                    )
                    : (
                        <div>
                            <div className="titles">
                                <h3 className="product-title">Product</h3>
                                <h3 className="price">Price</h3>
                                <h3 className="quantity">Quantity</h3>
                                <h3 className="total">Total</h3>
                            </div>
                            <div className="cart-items">
                                {cart.cartItems &&
                            cart.cartItems.map((cartItem) => (
                                <div className="cart-item" key={cartItem.id}>
                                    <div className="cart-product">
                                        <img src={cartItem.img} alt={cartItem.name} />
                                        <div>
                                            <Link className = 'card__pizza__link' to={`/pizza/${cartItem._id}`}>
                                                <h3>{cartItem.name}</h3>
                                            </Link>
                                            <p>{cartItem.ingredients}</p>
                                            <Button label='Remove' action={handleRemoveFromCart} payload={cartItem}/>
                                        </div>
                                    </div>
                                    <div className="cart-product-price">${cartItem.price}</div>
                                    <div className="cart-product-quantity">
                                        <Button label='-' action={handleDecreaseCart} payload={cartItem} />
                                        <div className="count">{cartItem.cartQuantity}</div>
                                        <Button label='+' action={handleAddToCart} payload={cartItem}/>
                                    </div>
                                    <div className="cart-product-total-price">
                                        ${cartItem.price * cartItem.cartQuantity}
                                    </div>
                                </div>
                            ))}
                            </div>
                            <div className="cart-summary">
                                <Button label='Clear Cart' className='btn btn_rectangular w-25' action={handleClearCart}/>
                                <div className="cart-checkout">
                                    <div className="subtotal">
                                        <span>Total</span>
                                        <span className="amount">${cart.cartTotalAmount}</span>
                                    </div>
                                    {isLoggedIn
                                        ? <Button label='Check Out' action={handlePlaceTheOrder} className='btn w-100 btn_rectangular'/>
                                        : <NavLink to='/login'>
                                            <Button label='Sign in to Proceed' className='btn w-100 btn_rectangular'/>
                                        </NavLink>}
                                    {isOpen && <ModalWindow setIsOpen={setIsOpen} />}
                                    <div className="continue-shopping">
                                        <Link to="/menu">
                                            <img className='cart_arrows' src={backArrow} alt=""/>
                                            <span>Continue Shopping</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default Cart;
