import { createAction, createSlice } from '@reduxjs/toolkit';
import pizzaService from '../../services/pizza.service';

const initialState = {
    entities: null,
    isLoading: false,
    error: null,
    dataLoaded: false
};
const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        pizzasRequested: (state) => {
            state.isLoading = true;
        },
        pizzasReceived: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        addedPizzaReceived: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        pizzasRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        pizzaRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (p) => p._id !== action.payload
            );
        },
        pizzaUpdateSuccessed: (state, action) => {
            state.entities[state.entities.findIndex(u => u._id === action.payload._id)] = action.payload;
        }
    }
});

const { reducer: pizzaReducer, actions } = pizzaSlice;
const { pizzasRequested, pizzasReceived, pizzasRequestFiled, addedPizzaReceived, pizzaUpdateSuccessed, pizzaRemoved } = actions;
const removePizzaRequested = createAction('pizza/removePizzaRequested');
const pizzaUpdateRequested = createAction('pizza/pizzaUpdateRequested');
const addPizzasRequested = createAction('pizza/addPizzasRequested');
const pizzaUpdateFailed = createAction('pizza/pizzaUpdateFailed');

export const loadPizzasList = () => async (dispatch) => {
    dispatch(pizzasRequested());
    try {
        const { content } = await pizzaService.get();
        dispatch(pizzasReceived(content));
    } catch (error) {
        dispatch(pizzasRequestFiled(error.message));
    }
};
export const removePizza = (pizzaId) => async (dispatch) => {
    dispatch(removePizzaRequested());
    try {
        const { content } = await pizzaService.removePizza(pizzaId);
        if (!content) {
            dispatch(pizzaRemoved(pizzaId));
        }
    } catch (error) {
        dispatch(pizzasRequestFiled(error.message));
    }
};

export const addPizza = (payload) => async (dispatch, getState) => {
    dispatch(addPizzasRequested());
    try {
        const { content } = await pizzaService.createPizza(payload);
        dispatch(addedPizzaReceived(content));
    } catch (error) {
        dispatch(pizzasRequestFiled(error.message));
    }
};

export const updatePizza = (payload) => async (dispatch) => {
    dispatch(pizzaUpdateRequested());
    try {
        const { content } = await pizzaService.update(payload);
        dispatch(pizzaUpdateSuccessed(content));
        history.push(`/users/${content._id}`);
    } catch (error) {
        dispatch(pizzaUpdateFailed(error.message));
    }
};

export const getPizzas = () => (state) => state.pizza.entities;
export const getPizzasLoadingStatus = () => (state) => state.pizza.isLoading;
export const getDataStatus = () => (state) => state.pizza.dataLoaded;
export const getPizzasById = (pizzaId) => (state) => {
    if (state.pizza.entities) {
        return state.pizza.entities.find((p) => p._id === pizzaId);
    }
};
export default pizzaReducer;
