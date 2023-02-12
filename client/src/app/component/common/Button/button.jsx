import React from 'react';
import PropTypes from 'prop-types';
import './button.css';

// test//

const Button = ({ label, className, action, payload, btnType, disabled }) => {
    return (
        action
            ? (
                <button className={className} type={btnType} disabled={disabled} onClick={() => action(payload)}>{label}</button>
            )
            : (
                <button className={className} type={btnType} disabled={disabled}>{label}</button>
            )
    );
};
Button.propTypes = {
    label: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    className: PropTypes.string,
    action: PropTypes.func,
    payload: PropTypes.object,
    btnType: PropTypes.string,
    disabled: PropTypes.bool
};
export default Button;
