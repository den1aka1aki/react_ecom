import React, { useEffect } from 'react';
import './pizzas.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addToCar, getTotals } from '../../../../store/slices/basketSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../../common/Button/button';

const Pizza = ({ pizza }) => {
    const dispatch = useDispatch();
    const handleAddToCart = (product) => {
        dispatch(addToCar(product));
        toast.success('You just added pizza to your basket', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored'
        });
    };
    const cart = useSelector((state) => state.cart);
    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);

    return (
        <>
            <div key={pizza._id} className='card__pizza'>
                <Link className = 'card__pizza__link' to = {`/pizza/${pizza._id}`}>
                    <img className='card__pizza__img' alt='' src={pizza.img}/>
                    <h4 className='card__pizza__title'>{pizza.name}</h4>
                </Link>
                <p className='card__pizza__discription'>{pizza.ingredients}</p>
                <h5 className='card__pizza__price__tag'>{pizza.price} €</h5>
                <Button action={handleAddToCart} payload={pizza} className='btn round_btn ' label={'ADD TO CARD'}/>
            </div>

        </>
    );
};
Pizza.propTypes = {
    pizza: PropTypes.object
};
export default Pizza;
