import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getDataStatus, loadPizzasList } from '../../../store/slices/pizzaSlice';

const PizzaLoader = ({ children }) => {
    const dataStatus = useSelector(getDataStatus());
    const dispatch = useDispatch();
    useEffect(() => {
        if (!dataStatus) dispatch(loadPizzasList());
    }, [dataStatus]);
    if (!dataStatus) return 'Loading';
    return children;
};

PizzaLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
export default PizzaLoader;
