import React, { useEffect, useState } from 'react';
import { validator } from '../utils/validator';
import TextField from '../component/common/form/textField';
import { useDispatch } from 'react-redux';
import { signUp } from '../store/slices/userSlice';
import { useHistory } from 'react-router-dom';
const RegisterForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [data, setData] = useState({ email: '', password: '', name: '', licence: false });
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        email: {
            isRequired:
                {
                    message: 'Электронная почта обязательна для заполнения'
                }
        },
        name: {
            isRequired:
                {
                    message: 'Имя обязательна для заполнения'
                },
            min:
                {
                    message: 'Имя должен состоять минимум из 3 символов',
                    value: 3
                }
        },
        password: {
            isRequired:
                {
                    message: 'Пароль обязательна для заполнения'
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
        const redirect = history.location.state
            ? history.location.state.from.pathname
            : '/';
        const newData = { ...data };
        dispatch(signUp({ payload: newData, redirect }));
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label = 'Электронная почта'
                name = 'email'
                value = {data.email}
                onChange = {handleChange}
                error = {errors.email}
            />
            <TextField
                label = 'Имя'
                name = 'name'
                value = {data.name}
                onChange = {handleChange}
                error = {errors.name}
            />
            <TextField
                label = 'Пароль'
                type = 'password'
                name = 'password'
                value = {data.password}
                onChange = {handleChange}
                error = {errors.password}
            />
            <button className='btn btn-primary w-100 mx-auto' type='submit' disabled={!isValid}>Submit</button>
        </form>
    );
};

export default RegisterForm;
