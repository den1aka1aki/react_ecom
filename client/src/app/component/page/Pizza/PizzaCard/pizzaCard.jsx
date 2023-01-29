import React, { useEffect } from 'react';
import './pizzaSpecification.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPizzasById } from '../../../../store/slices/pizzaSlice';
import { addToCar, decreaseCart, getTotals } from '../../../../store/slices/basketSlice';

const PizzaCard = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const pizza = useSelector(getPizzasById(params.pizzaId));

    const cart = useSelector((state) => state.cart);
    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);

    const handleAddToCart = (product) => {
        dispatch(addToCar(product));
    };
    const handleDecreaseCart = (product) => {
        dispatch(decreaseCart(product));
    };
    console.log('pizzaID              ' + pizza._id);
    return (
        <>
            <div className="container">
                <div className='main__space'>
                    <div className='wrapper'>
                        <div className="product-img">
                            <img alt={'pizza_photo'} className='product-img' src={pizza.img} />
                        </div>
                        <div className="product-info">
                            <div className="product-text">
                                <h1>{pizza.name}</h1>
                                <p>{pizza.ingredients}</p>
                            </div>

                            {cart.cartTotalQuantity > 0
                                ? (<div>
                                    {cart.cartItems.map((cartItem) => (
                                        (cartItem._id === pizza._id
                                            ? (<div className="product_details">
                                                <h5>Total in Cart</h5>
                                                <ul>
                                                    <div className="">Total amount: {cart.cartTotalQuantity}</div>
                                                    <div className="">Total Quantity: {cart.cartTotalAmount} $</div>
                                                </ul>
                                                <button className='btn' onClick={() => handleAddToCart(pizza)}>
                                                +
                                                </button>
                                                <button className='btn' onClick={() => handleDecreaseCart(pizza)}>
                                                -
                                                </button>
                                            </div>
                                            )
                                            : null)
                                    ))}
                                </div>
                                )
                                : (null)}
                            <div className='product-price-btn'>
                                <p><span>{pizza.price}</span>$</p>
                                <button onClick={() => handleAddToCart(pizza)} className='card__pizza__cart__btn'>ADD TO CARD</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PizzaCard;
