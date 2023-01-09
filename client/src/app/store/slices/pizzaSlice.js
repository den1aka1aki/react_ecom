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
        pizzasReceved: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        pizzasRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        pizzaRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (p) => p._id !== action.payload
            );
        }
    }
});

const { reducer: pizzaReducer, actions } = pizzaSlice;
const { pizzasRequested, pizzasReceved, pizzasRequestFiled, pizzaRemoved } = actions;
const removePizzaRequested = createAction('pizza/removePizzaRequested');

export const loadPizzasList = () => async (dispatch) => {
    dispatch(pizzasRequested());
    try {
        const { content } = await pizzaService.get();
        dispatch(pizzasReceved(content));
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
export const getPizzas = () => (state) => state.pizza.entities;
export const getPizzasLoadingStatus = () => (state) => state.pizza.isLoading;
export const getDataStatus = () => (state) => state.pizza.dataLoaded;
export const getPizzasById = (id) => (state) => {
    if (state.pizza.entities) {
        return state.pizza.entities.find((p) => p._id === id);
    }
};
export default pizzaReducer;
