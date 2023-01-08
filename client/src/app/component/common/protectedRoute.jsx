import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getCurrentUser, getIsLoading, getIsLoggedIn } from '../../store/user';
const ProtectedRoute = ({ children, isAdmin, to = '/login/signin' }) => {
    const isLoading = useSelector(getIsLoading());
    const isLoggedIn = useSelector(getIsLoggedIn());
    const currentUser = useSelector(getCurrentUser());

    if (!isLoading) {
        if (isLoggedIn) {
            if (isAdmin) {
                if (currentUser.isAdmin) {
                    return children;
                }
            } else {
                return children;
            }
        }
        return <Redirect
            to={{
                pathname: '/'
            }}
        />;
    }
};
ProtectedRoute.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ]).isRequired,
    isAdmin: PropTypes.bool,
    to: PropTypes.string
};
export default ProtectedRoute;
