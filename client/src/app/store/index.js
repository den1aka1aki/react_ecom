import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import cartReducer from './basketSlice';
import pizzaReducer from './pizzaSlice';

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    pizza: pizzaReducer
});

export function createStore () {
    return configureStore({
        reducer: rootReducer
    });
}
