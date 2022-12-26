import React, { useEffect, useState } from 'react';
import Pizza from './pizza';
import api from '../api';

const Manager = () => {
    const [pizza, setPizza] = useState([]);
    useEffect(() => {
        api.pizzas.fetchAll().then((data) => setPizza(data));
    }, []);
    return (
        <>
            <div className='container'>
                <div className='main__space'>
                    <div className='cards__placeholder'>
                        {pizza.map((piz) => (
                            <Pizza key={piz._id} pizza ={piz}/>
                        ))}
                    </div>
                </div>
            </div>
                )
        </>
    );
};

export default Manager;
