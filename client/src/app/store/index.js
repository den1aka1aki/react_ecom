import { combineReducers, configureStore } from '@reduxjs/toolkit';
import managersReducer from './manager';
import cartReducer from './basketSlice';

const rootReducer = combineReducers({
    manager: managersReducer,
    cart: cartReducer
});

export function createStore () {
    return configureStore({
        reducer: rootReducer
    });
}
