import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPizzas, removePizza } from '../../../store/slices/pizzaSlice';
import { useHistory } from 'react-router-dom';

const Admin = () => {
    const pizza = useSelector(getPizzas());
    const dispatch = useDispatch();
    const history = useHistory();
    const handleRemovePizza = (id) => {
        dispatch(removePizza(id));
    };
    const handleEdit = (id) => {
        console.log(id);
        history.push(`/edit/${id}`);
    };
    return (
        <>
            <div className='container'>
                <div className='main__space'>
                    <div className="cart-container">
                        <h2>Administration Page</h2>
                        <div>
                            <div className="cart-items">
                                {pizza.map((p) => (
                                    <div className="cart-item" key={p.id}>
                                        <div className="cart-product">
                                            <img src={p.img} alt={p.name} />
                                            <div>
                                                <h3>{p.name}</h3>
                                                <p>{p.ingredients}</p>
                                            </div>
                                        </div>
                                        <div className="cart-product-price">${p.price}</div>
                                        <button className='card__pizza__cart__btn' onClick={() => handleEdit(p._id)}>
                                            Edit
                                        </button>
                                        <button className='card__pizza__cart__btn' onClick={() => handleRemovePizza(p._id)}>
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Admin;
