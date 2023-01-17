import React, { useEffect, useState } from 'react';
import TextField from '../../../common/form/textField';
import { validator } from '../../../../utils/validator';
import { useDispatch } from 'react-redux';
import { addPizza } from '../../../../store/slices/pizzaSlice';
import './addNewPizza.css';
import { useHistory } from 'react-router-dom';

const AddNewPizzaForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [data, setData] = useState({
        name: '',
        ingredients: '',
        price: '',
        vote: '',
        type: '',
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
                message: 'Название пиццы обязательно для заполнения'
            },
            isContainLetters: {
                message: 'Название введено не корректно'
            }
        },
        ingredients: {
            isRequired: {
                message: 'Поле ингредиенты обязательно для заполнения'
            },
            isContainLetters: {
                message: 'Поле ингредиенты введено не корректно'
            }
        },
        price: {
            isRequired: {
                message: 'Цена обязательна для заполнения'
            },
            isContainDigit: {
                message: 'Число было введено не корректно'
            }
        },
        vote: {
            isRequired: {
                message: 'Оценка обязательна для заполнения'
            },
            isContainDigit: {
                message: 'Число было введено не корректно'
            }
        },
        type: {
            isRequired: {
                message: 'Поле \'тип товара\' обязательно для заполнения'
            }
        },
        img: {
            isRequired: {
                message: 'Адрес фотографии обязателен для заполнения'
            },
            isURL: {
                message: 'Введенный адрес не является корректным'
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
        dispatch(addPizza(newData));
        history.push('/admin');
    };
    const handleBack = () => {
        history.push('/admin');
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
                            error={errors.ingredients}
                        />
                        <TextField
                            label="Price"
                            name="price"
                            value={data.price}
                            onChange={handleChange}
                            error={errors.price}
                        />
                        <TextField
                            label="Vote"
                            name="vote"
                            value={data.vote}
                            onChange={handleChange}
                            error={errors.vote}
                        />
                        <TextField
                            label="Type"
                            name="type"
                            value={data.type}
                            onChange={handleChange}
                            error={errors.type}
                        />
                        <TextField
                            label="Image"
                            name="img"
                            value={data.img}
                            onChange={handleChange}
                            error={errors.img}
                        />
                        <button
                            type="submit"
                            disabled={!isValid}
                            className="addNewPizzaPage_btn"
                        >
                                 Create
                        </button>
                        <button
                            type="submit"
                            className="addNewPizzaPage_btn"
                            onClick={handleBack}
                        >
                            Go Back
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddNewPizzaForm;
