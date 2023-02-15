import React, { useEffect, useState } from 'react';
import TextField from '../../../common/form/textField';
import { validator } from '../../../../utils/validator';
import { useDispatch } from 'react-redux';
import { addPizza } from '../../../../store/slices/pizzaSlice';
import './addNewPizza.css';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

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
                message: 'Name is mandatory'
            },
            isContainLetters: {
                message: 'Name entered not correctly'
            }
        },
        ingredients: {
            isRequired: {
                message: 'Field ingredients is mandatory'
            },
            isContainLetters: {
                message: 'This field is entered not correctly'
            }
        },
        price: {
            isRequired: {
                message: 'Price is mandatory'
            },
            isContainDigit: {
                message: 'Number entered not correctly'
            }
        },
        vote: {
            isRequired: {
                message: 'Vote is mandatory'
            },
            isContainDigit: {
                message: 'Number entered not correctly'
            }
        },
        type: {
            isRequired: {
                message: 'Field \'product type\' is mandatory'
            }
        },
        img: {
            isRequired: {
                message: 'Field photo address is mandatory'
            },
            isURL: {
                message: 'This field is entered not correctly'
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
    const notify = () => toast.success('Added new product', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
    }); ;
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
                            className="btn round_btn m-2"
                            onClick={notify}
                        >
                                 Create
                        </button>
                        <button
                            type="submit"
                            className="btn round_btn m-2"
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
