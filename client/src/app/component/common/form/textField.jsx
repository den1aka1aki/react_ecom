import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/button';

const TextField = ({ label, type, name, value, onChange, error, placeholder }) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    const getInputClasses = () => {
        return 'form-control' + (error ? ' is-invalid' : '');
    };
    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };
    return (
        <div className='mb-4'>
            <label htmlFor={name}>{label}</label>
            <div className='input-group has-validation'>
                <input
                    className={getInputClasses()}
                    type={showPassword ? 'text' : type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                />
                {type === 'password' && (
                    <Button className='btn__pswd_page'
                        label={ <i className={'bi bi-eye' + (showPassword ? '-slash' : '')}></i>}
                        type='button'
                        action={toggleShowPassword}>
                    </Button>
                )}
                {error && <div className='invalid-feedback'>{error}</div>}
            </div>
        </div>
    );
};
TextField.defaultProps = {
    type: 'text'
};
TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    placeholder: PropTypes.string
};
export default TextField;
