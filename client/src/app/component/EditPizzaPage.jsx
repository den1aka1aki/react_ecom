import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPizzasById, updatePizza } from '../store/slices/pizzaSlice';
import TextField from './common/form/textField';
import { validator } from '../utils/validator';
// import { useSelector } from 'react-redux';
// import { getPizzasById } from '../store/slices/pizzaSlice';

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

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const validatorConfig = {
        name: {
            isRequired: {
                message: 'Введите название'
            }
        }
    };
    const isValid = Object.keys(errors).length === 0;
    useEffect(() => {
        validate();
    }, [data]);
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading
                        ? (
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
                                    label="Image"
                                    name="img"
                                    value={data.img}
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                                <button
                                    type="submit"
                                    disabled={!isValid}
                                    className="btn btn-primary w-100 mx-auto"
                                >
                Обновить
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
