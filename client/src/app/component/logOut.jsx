import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { logOut } from '../store/slices/userSlice';
import { clearCart } from '../store/slices/basketSlice';

const LogOut = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logOut());
        dispatch(clearCart());
    }, []);
    return (
        <div>
            <h1>Loading</h1>
        </div>
    );
};

export default LogOut;
