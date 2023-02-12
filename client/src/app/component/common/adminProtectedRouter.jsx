import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getCurrentUserData } from '../../store/slices/userSlice';
const ProtectedRoute = ({ component: Component, children, ...rest }) => {
    const currentUser = useSelector(getCurrentUserData());
    return (
        <Route
            {...rest}
            render={(props) => {
                if (!currentUser.isAdmin) {
                    return (
                        <Redirect
                            to={{
                                pathname: '/',
                                state: {
                                    from: props.location
                                }
                            }}
                        />

                    );
                }
                return Component ? <Component {...props} /> : children;
            }}
        />
    );
};
ProtectedRoute.propTypes = {
    component: PropTypes.func,
    location: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ProtectedRoute;
