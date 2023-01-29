import React, { useEffect, useState } from 'react';
import { validator } from '../utils/validator';
import CheckBoxField from './common/form/checkBoxField';
import TextField from './common/form/textField';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../store/slices/userSlice';
import '../component/page/HomePage/home.css';

const LoginForm = () => {
    const dispatch = useDispatch();
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
                    message: 'Email is mandatory'
                },
            isEmail: {
                message: 'Email is not correct'
            }
        },
        password: {
            isRequired:
                {
                    message: 'Password is mandatory'
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
    return (

        <form onSubmit={handleSubmit} >
            <TextField
                label = 'Email'
                name = 'email'
                value = {data.email}
                onChange = {handleChange}
                error = {errors.email}
            />
            <TextField
                label = 'Password'
                type = 'password'
                name = 'password'
                value = {data.password}
                onChange = {handleChange}
                error = {errors.password}
            />
            <CheckBoxField value={data.stayOn} onChange={handleChange} name='stayOn'>Оставаться в системе</CheckBoxField>
            <button className='submit_btn' type='submit' disabled={!isValid}>Submit</button>

        </form>
    );
};

export default LoginForm;
