import localStorageService from '../services/localStorage.service';
import { createAction, createSlice } from '@reduxjs/toolkit';
import { generetaAuthError } from '../utils/generetaAuthError';
import authService from '../services/auth.service';
import history from '../utils/history';

const initialState = localStorageService.getAccessToken()
    ? {
        entities: null,
        isLoading: true,
        error: null,
        auth: { userId: localStorageService.getUserID() },
        isLoggedIn: true
    }
    : {
        entities: null,
        isLoading: false,
        error: null,
        auth: null,
        isLoggedIn: false
    };

const managerSlice = createSlice({
    name: 'manager',
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceived: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        usersRequestedFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequestedSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authRequestedFailed: (state, action) => {
            state.error = action.payload;
        },
        userCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        userLoggedOut: (state) => {
            state.entities = null;
            state.isLoggedIn = false;
            state.auth = null;
            state.dataLoaded = false;
        },
        userUpdateSuccessed: (state, action) => {
            state.entities[state.entities.findIndex(u => u._id === action.payload._id)] = action.payload;
        },
        authRequested: (state) => {
            state.error = null;
        }
    }
});

const { reducer: managersReducer, actions } = managerSlice;
const { authRequestedSuccess, authRequestedFailed, userLoggedOut } = actions;

const authRequested = createAction('users/authRequested');

export const login = ({ payload, redirect }) => async (dispatch) => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
        const data = await authService.logIn({ email, password });
        dispatch(authRequestedSuccess({ userId: data.localId }));
        localStorageService.setTokens(data);
        history.push(redirect);
    } catch (error) {
        const { code, message } = error.response.data.error;
        if (code === 400) {
            console.log(code);
            const errorMessage = generetaAuthError(message);
            dispatch(authRequestedFailed(errorMessage));
        } else {
            dispatch(authRequestedFailed(error.message));
        }
    }
};
export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLoggedOut());
    history.push('/');
};
export const getAuthErrors = () => (state) => state.manager.error;
export const getIsLoggedIn = () => (state) => state.manager.isLoggedIn;

export default managersReducer;
