import React from 'react';
import './modalWindow.css';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../../store/slices/basketSlice';
import { useHistory } from 'react-router-dom';
const ModalWindow = ({ setIsOpen }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const handleClose = () => {
        setIsOpen(false);
        dispatch(clearCart());
        history.push('/');
    };

    return (
        <>
            <div className="darkBG" onClick={() => setIsOpen(false)} />
            <div className="centered">
                <div className='modalHeader'>
                    <h4 className='heading'>Order status</h4>
                </div>

                <div className='modalContent'>
                    <p className='modalContent_text'>Your order in preparation</p>
                    <p className='modalContent_text'>We hope to see you soon again</p>

                </div>
                <button className='closeBtn' onClick={() => handleClose()}>
                    Close
                </button>
            </div>
        </>
    );
};
ModalWindow.propTypes = {
    setIsOpen: PropTypes.func
};
export default ModalWindow;
