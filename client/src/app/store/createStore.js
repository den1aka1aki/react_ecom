import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import cartReducer from './slices/basketSlice';
import pizzaReducer from './slices/pizzaSlice';

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
