import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getIsLoggedIn } from '../store/user';
import { addToCar, getTotals } from '../store/basketSlice';

const Pizza = ({ pizza }) => {
    const isLoggedIn = useSelector(getIsLoggedIn());
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
                <h4 className='card__pizza__title'>{pizza.name}</h4>
                <p className='card__pizza__discription'>{pizza.ingredients}</p>
                <h5 className='card__pizza__price__tag'>{pizza.price} €</h5>
                <div className={isLoggedIn ? 'btn__manager__space' : null}>
                    <button onClick={() => handleAddToCart(pizza)} className='card__pizza__cart__btn'>ADD TO CARD</button>
                    {isLoggedIn
                        ? <button className='change_btn'>
                            <i className='bi bi-gear'></i>
                        </button>
                        : null
                    }
                </div>
            </div>
        </>
    );
};
Pizza.propTypes = {
    pizza: PropTypes.object
};
export default Pizza;
