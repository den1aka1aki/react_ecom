import React from 'react';
import './adminPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { getDataStatus, getPizzas, removePizza } from '../../../store/slices/pizzaSlice';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../common/Button/button';

const Admin = () => {
    const pizza = useSelector(getPizzas());
    const pizzasStatus = useSelector(getDataStatus());
    const dispatch = useDispatch();
    const history = useHistory();
    const handleRemovePizza = (id) => {
        notify();
        dispatch(removePizza(id));
    };
    const handleEdit = (id) => {
        console.log(id);
        history.push(`/edit/${id}`);
    };
    const handleAdd = () => {
        history.push('/addNewPizza?');
    };
    const notify = () => toast.error('Product was deleted', {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
    });
    return (
        <>
            {pizza && pizzasStatus &&
            <div className='container'>
                <h2 className='adminPage_title'>Administration Page</h2>
                <div className='adminPage_add_space'>
                    <Button label='Add New Pizza' className='btn round_btn mb-4' action={handleAdd}/>
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
                                    <Button className='btn round_btn w-auto m-1' action={handleEdit} payload={p._id} label='Edit'/>
                                    <Button className='btn round_btn w-auto m-1' action={handleRemovePizza} payload={p._id} label='Delete'/>
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
