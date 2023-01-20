import localStorageService from '../../services/localStorage.service';
import { createAction, createSlice } from '@reduxjs/toolkit';
import { generetaAuthError } from '../../utils/generetaAuthError';
import authService from '../../services/auth.service';
import history from '../../utils/history';
import userService from '../../services/user.service';

const initialState = localStorageService.getAccessToken()
    ? {
        entities: null,
        isLoading: true,
        error: null,
        auth: { userId: localStorageService.getUserId() },
        isLoggedIn: true,
        dataLoaded: false
    }
    : {
        entities: null,
        isLoading: false,
        error: null,
        auth: null,
        isLoggedIn: false,
        dataLoaded: false
    };

const userSlice = createSlice({
    name: 'user',
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
        usersRequestFiled: (state, action) => {
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
            state.entities[
                state.entities.findIndex((u) => u._id === action.payload._id)
            ] = action.payload;
        },
        authRequested: (state) => {
            state.error = null;
        }
    }
});

const { reducer: userReducer, actions } = userSlice;
const { authRequestedSuccess, usersRequested, usersReceived, usersRequestFiled, authRequestedFailed, userLoggedOut } = actions;

const authRequested = createAction('users/authRequested');
// const userCreateRequested = createAction('user/userCreateRequested');
// const createUserFailed = createAction('user/createUserFailed');

export const login = ({ payload, redirect }) => async (dispatch) => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
        const data = await authService.logIn({ email, password });
        localStorageService.setTokens(data);
        dispatch(authRequestedSuccess({ userId: data.userId }));
        history.push(redirect);
    } catch (error) {
        const { code, message } = error.response.data.error;
        if (code === 400) {
            const errorMessage = generetaAuthError(message);
            dispatch(authRequestedFailed(errorMessage));
        } else {
            dispatch(authRequestedFailed(error.message));
        }
    }
};

export const signUp = (payload) => async (dispatch) => {
    dispatch(authRequested());
    try {
        const data = await authService.register(payload);
        localStorageService.setTokens(data);
        dispatch(authRequestedSuccess({ userId: data.userId }));
        history.push('/');
    } catch (error) {
        dispatch(authRequestedFailed(error.message));
    }
};

export const getCurrentUser = () => (state) => {
    return state.user.entities && state.user.isLoggedIn
        ? state.user.entities.find(
            (user) => user._id === state.user.auth.userId
        )
        : null;
};

// export const signUp = (payload) => async (dispatch) => {
//     dispatch(authRequested());
//     try {
//         const data = await authService.register(payload);
//         localStorageService.setTokens(data);
//         dispatch(authRequestedSuccess({ userId: data.userId }));
//         dispatch(createUser({ payload }));
//         history.push('/');
//     } catch (error) {
//         dispatch(authRequestedFailed(error.message));
//     }
// };
// function createUser (payload) {
//     return async function (dispatch) {
//         dispatch(userCreateRequested());
//         try {
//             const { content } = await userService.create(payload);
//             dispatch(userCreated(content));
//         } catch (error) {
//             dispatch(createUserFailed(error.message));
//         }
//     };
// }
export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLoggedOut());
    history.push('/');
};
export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequested());
    try {
        const { content } = await userService.get();
        dispatch(usersReceived(content));
    } catch (error) {
        dispatch(usersRequestFiled(error.message));
    }
};
export const getCurrentUserData = () => (state) => {
    return state.user.entities
        ? state.user.entities.find((u) => u._id === state.user.auth.userId)
        : null;
};
export const getUserById = (userId) => (state) => {
    if (state.user.entities) {
        return state.user.entities.find((u) => u._id === userId);
    }
};

export const getDataStatus = () => (state) => state.user.dataLoaded;
export const getAuthErrors = () => (state) => state.user.error;
export const getIsLoggedIn = () => (state) => state.user.isLoggedIn;

export default userReducer;
