import { createSlice } from '@reduxjs/toolkit';
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
        }
    }
});

const { reducer: pizzaReducer, actions } = pizzaSlice;
const { pizzasRequested, pizzasReceved, pizzasRequestFiled } = actions;

export const loadPizzasList = () => async (dispatch) => {
    dispatch(pizzasRequested());
    try {
        const { content } = await pizzaService.get();
        dispatch(pizzasReceved(content));
    } catch (error) {
        dispatch(pizzasRequestFiled(error.message));
    }
};
export const getPizzas = () => (state) => state.pizza.entities;
export const getPizzasLoadingStatus = () => (state) => state.pizza.isLoading;
export const getDataStatus = () => (state) => state.pizza.dataLoaded;
export const getCurrentPizzaId = () => (state) => state.pizza.pizzaId;
export const getPizzasById = (id) => (state) => {
    if (state.pizza.entities) {
        return state.pizza.entities.find((p) => p._id === id);
    }
};
export default pizzaReducer;
