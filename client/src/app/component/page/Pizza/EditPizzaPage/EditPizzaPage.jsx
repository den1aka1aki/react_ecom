import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPizzasById, updatePizza } from '../../../../store/slices/pizzaSlice';
import TextField from '../../../common/form/textField';
import { validator } from '../../../../utils/validator';
import './editPizzaPage.css';
import { toast } from 'react-toastify';

const EditPizzaPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
    const history = useHistory();
    const currentPizza = useSelector(getPizzasById(params.pizzaId));
    const [data, setData] = useState();
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);

    useEffect(() => {
        if (currentPizza && !data) {
            setData({
                ...currentPizza
            });
        }
    }, [currentPizza, data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        dispatch(updatePizza({ ...data }));
        history.push('/admin');
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

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const handleBack = () => {
        history.push('/admin');
    };

    const isValid = Object.keys(errors).length === 0;
    useEffect(() => {
        validate();
    }, [data]);
    const notify = () => toast.warning('Product was refreshed', {
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
        <div className='container'>
            <div className='main__space'>
                <div className='editPizzaPage_form'>
                    {!isLoading
                        ? (
                            <form className='' onSubmit={handleSubmit}>
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
                                    className="editPage_btn"
                                    onClick={notify}
                                >
                                    Refresh
                                </button>
                                <button
                                    type="submit"
                                    className="editPage_btn"
                                    onClick={handleBack}
                                >
                                    Go Back
                                </button>
                            </form>
                        )
                        : 'Loading ...'}
                </div>
            </div>
        </div>
    );
};

export default EditPizzaPage;
