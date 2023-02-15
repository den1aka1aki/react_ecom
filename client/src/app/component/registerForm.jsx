import React, { useEffect, useState } from 'react';
import { validator } from '../utils/validator';
import TextField from '../component/common/form/textField';
import { useDispatch } from 'react-redux';
import { signUp } from '../store/slices/userSlice';
import 'react-toastify/dist/ReactToastify.css';
import '../component/page/HomePage/home.css';
const RegisterForm = () => {
    const dispatch = useDispatch();
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
                    message: 'Email is mandatory'
                }
        },
        name: {
            isRequired:
                {
                    message: 'Name is mandatory'
                },
            min:
                {
                    message: 'Name must be at least 3 symbols',
                    value: 3
                }
        },
        password: {
            isRequired:
                {
                    message: 'Password is mandatory'
                },
            isCapitalSymbol:
                {
                    message: 'Password must contain at least 1 capital letter'
                },
            isContainDigit:
                {
                    message: 'Password must contain at least 1 number'
                },
            min:
                {
                    message: 'Password must contain minimum 8 symbols',
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
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = { ...data };
        dispatch(signUp(newData));
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label = 'Email'
                name = 'email'
                value = {data.email}
                onChange = {handleChange}
                error = {errors.email}
            />
            <TextField
                label = 'Name'
                name = 'name'
                value = {data.name}
                onChange = {handleChange}
                error = {errors.name}
            />
            <TextField
                label = 'Password'
                type = 'password'
                name = 'password'
                value = {data.password}
                onChange = {handleChange}
                error = {errors.password}
            />
            <button className='btn btn_rectangular w-100 m-1' type='submit' disabled={!isValid}>Submit</button>
        </form>
    );
};

export default RegisterForm;
