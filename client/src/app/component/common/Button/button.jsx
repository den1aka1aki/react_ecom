import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ label, className, action, payload }) => {
    return (
        <button className={className} onClick={() => action(payload)}>{label}</button>
    );
};
Button.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    action: PropTypes.func,
    payload: PropTypes.object
};
export default Button;
