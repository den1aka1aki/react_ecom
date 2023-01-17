import React from 'react';
import './adminPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { getDataStatus, getPizzas, removePizza } from '../../../store/slices/pizzaSlice';
import { useHistory } from 'react-router-dom';

const Admin = () => {
    const pizza = useSelector(getPizzas());
    const pizzasStatus = useSelector(getDataStatus());
    console.log('pizza....' + pizza);
    console.log('pizzasStatus....' + pizzasStatus);
    const dispatch = useDispatch();
    const history = useHistory();
    const handleRemovePizza = (id) => {
        dispatch(removePizza(id));
    };
    const handleEdit = (id) => {
        console.log(id);
        history.push(`/edit/${id}`);
    };
    const handleAdd = () => {
        history.push('/addNewPizza?');
    };
    return (
        <>
            {pizza && pizzasStatus &&
            <div className='container'>
                <h2 className='adminPage_title'>Administration Page</h2>
                <div className='adminPage_add_space'>
                    <button className='adminPage_add_btn' onClick={() => handleAdd()}>
                            Add New Pizza
                    </button>
                </div>
                <div className='main__space'>
                    <div className="adminPage_items">
                        {pizza.map((p) => (
                            <div className="adminPage_item" key={p.id}>
                                <div className="adminPage_product">
                                    <img src={p.img} alt={p.name}/>
                                    <div>
                                        <h3>{p.name}</h3>
                                        <p>{p.ingredients}</p>
                                    </div>
                                </div>
                                <div className="adminPage_price">${p.price}</div>
                                <div>
                                    <button className='adminPage_btn' onClick={() => handleEdit(p._id)}>
                                            Edit
                                    </button>
                                    <button className='adminPage_btn' onClick={() => handleRemovePizza(p._id)}>
                                            Delete
                                    </button>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
            }
        </>
    );
};

export default Admin;
