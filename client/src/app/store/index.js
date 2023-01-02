import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import cartReducer from './basketSlice';

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer
});

export function createStore () {
    return configureStore({
        reducer: rootReducer
    });
}
