import React, { useEffect, useState } from 'react';
import TextField from '../../../common/form/textField';
import { validator } from '../../../../utils/validator';
import { useDispatch } from 'react-redux';
import { addPizza } from '../../../../store/slices/pizzaSlice';
import './addNewPizza.css';

const AddNewPizzaForm = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        name: '',
        ingredients: '',
        price: '',
        vote: '',
        img: ''
    });
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        name: {
            isRequired: {
                message: 'Имя обязательно для заполнения'
            },
            min: {
                message: 'Имя должено состаять миниму из 3 символов',
                value: 3
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = {
            ...data
        };
        console.log({ data });
        dispatch(addPizza(newData));
    };
    return (
        <div className="container mt-5">
            <div className="main__space">
                <div className="addNewPizza_form">
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Name"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            error={errors.name}
                        />
                        <TextField
                            label="Ingredients"
                            name="ingredients"
                            value={data.ingredients}
                            onChange={handleChange}
                            error={errors.name}
                        />
                        <TextField
                            label="Price"
                            name="price"
                            value={data.price}
                            onChange={handleChange}
                            error={errors.name}
                        />
                        <TextField
                            label="Vote"
                            name="vote"
                            value={data.vote}
                            onChange={handleChange}
                            error={errors.name}
                        />
                        <TextField
                            label="Type"
                            name="type"
                            value={data.type}
                            onChange={handleChange}
                            error={errors.name}
                        />
                        <TextField
                            label="Image"
                            name="img"
                            value={data.img}
                            onChange={handleChange}
                            error={errors.name}
                        />
                        <button
                            type="submit"
                            disabled={!isValid}
                            className="addNewPizzaPage_btn"
                        >
                                 Create
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddNewPizzaForm;
