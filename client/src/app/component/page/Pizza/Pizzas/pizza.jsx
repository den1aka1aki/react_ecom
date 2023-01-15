import React, { useEffect } from 'react';
import './pizzas.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addToCar, getTotals } from '../../../../store/slices/basketSlice';
import { Link } from 'react-router-dom';

const Pizza = ({ pizza }) => {
    const dispatch = useDispatch();
    const handleAddToCart = (product) => {
        dispatch(addToCar(product));
    };
    const cart = useSelector((state) => state.cart);
    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);

    return (
        <>
            <div key={pizza._id} className='card__pizza'>
                <img className='card__pizza__img' alt='' src={pizza.img}/>
                <Link className = 'card__pizza__link' to = {`/pizza/${pizza._id}`}>
                    <h4 className='card__pizza__title'>{pizza.name}</h4>
                </Link>
                <p className='card__pizza__discription'>{pizza.ingredients}</p>
                <h5 className='card__pizza__price__tag'>{pizza.price} €</h5>
                : <button onClick={() => handleAddToCart(pizza)} className='card__pizza__cart__btn'>ADD TO CARD</button>
            </div>

        </>
    );
};
Pizza.propTypes = {
    pizza: PropTypes.object
};
export default Pizza;
