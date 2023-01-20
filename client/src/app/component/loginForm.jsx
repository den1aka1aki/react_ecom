import React, { useEffect, useState } from 'react';
import { validator } from '../utils/validator';
import CheckBoxField from './common/form/checkBoxField';
import TextField from './common/form/textField';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAuthErrors, login } from '../store/slices/userSlice';
import { toast } from 'react-toastify';

const LoginForm = () => {
    const dispatch = useDispatch();
    const loginError = useSelector(getAuthErrors());
    const [data, setData] = useState({ email: '', password: '', stayOn: false });
    const [errors, setErrors] = useState({});
    const history = useHistory();
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
                },
            isEmail: {
                message: 'Email введен не верно'
            }
        },
        password: {
            isRequired:
                {
                    message: 'Пароль обязательна для заполнения'
                },
            isCapitalSymbol:
                {
                    message: 'Пароль должен содержать хотя бы одну заглавную букву'
                },
            isContainDigit:
                {
                    message: 'Пароль должен сожержать хотя бы одно число'
                },
            min:
                {
                    message: 'Пароль должен состоять минимум из 8 символов',
                    value: 8
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
    const isValid = !Object.keys(errors).length;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const redirect = history.location.state
            ? history.location.state.from.pathname
            : '/';
        dispatch(login({ payload: data, redirect }));
    };
    const notify = () => toast.success('Welcome back', {
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

        <form onSubmit={handleSubmit} >
            <TextField
                label = 'Электронная почта'
                name = 'email'
                value = {data.email}
                onChange = {handleChange}
                error = {errors.email}
            />
            <TextField
                label = 'Пароль'
                type = 'password'
                name = 'password'
                value = {data.password}
                onChange = {handleChange}
                error = {errors.password}
            />
            <CheckBoxField value={data.stayOn} onChange={handleChange} name='stayOn'>Оставаться в системе</CheckBoxField>
            {loginError && <p className="text-danger">{loginError}</p>}
            <button className='btn btn-primary w-100 mx-auto' type='submit' onClick={notify} disabled={!isValid}>Submit</button>

        </form>
    );
};

export default LoginForm;
