import React, { useEffect } from 'react';
import './pizzaSpecification.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPizzasById } from '../../store/slices/pizzaSlice';
import { addToCar, getTotals } from '../../store/slices/basketSlice';

const PizzaSpecification = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const pizza = useSelector(getPizzasById(params.pizzaId));
    const handleAddToCart = (product) => {
        dispatch(addToCar(product));
    };
    const cart = useSelector((state) => state.cart);
    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);
    return (
        <>
            <div className="container">
                <div className='main__space'>
                    <div className='wrapper'>
                        <div className="product-img">
                            <img src={pizza.img} height="420" width="327"/>
                        </div>
                        <div className="product-info">
                            <div className="product-text">
                                <h1>{pizza.name}</h1>
                                <p>{pizza.ingredients}</p>
                            </div>
                            <div className="product-price-btn">
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

export default PizzaSpecification;
