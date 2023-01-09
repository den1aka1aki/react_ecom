import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getCurrentUserData, getIsLoading, getIsLoggedIn } from '../../store/slices/userSlice';
const ProtectedRoute = ({ component: Component, children, ...rest }) => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    const isLoading = useSelector(getIsLoading());
    const currentUser = useSelector(getCurrentUserData());
    console.log('isLoading ' + isLoading);
    console.log('isLoggedIn ' + isLoggedIn);
    console.log('currentUser ' + currentUser);
    return (
        <Route
            {...rest}
            render={(props) => {
                if (!isLoggedIn) {
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
