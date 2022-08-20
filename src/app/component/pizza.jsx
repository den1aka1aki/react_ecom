import React, { useEffect, useState } from 'react';
import api from '../api';

const Pizza = () => {
    const [pizza, setPizza] = useState([]);
    useEffect(() => {
        api.pizzas.fetchAll().then((data) => setPizza(data));
    }, []);
    return (
        <>
            {pizza.map((piz) => (
                piz.vote >= 4
                    ? <div key={piz._id} className='card__pizza'>
                        <img className='card__pizza__img' alt='' src={piz.img}/>
                        <h4 className='card__pizza__title'>{piz.name}</h4>
                        <p className='card__pizza__discription'>{piz.ingredients}</p>
                        <h5 className='card__pizza__price__tag'>{piz.price} €</h5>
                        <button className='card__pizza__cart__btn'>ADD TO CARD</button>
                    </div>
                    : null
            ))}
        </>
    );
};

export default Pizza;
