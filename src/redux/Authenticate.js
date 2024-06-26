import { LOGIN, LOGOUT } from './ActionTypes';

const initialState = {
    isAuthenticated: false,
    user: null
};

export default function Authenticate(state = initialState, action) {

    switch (action.type) {
        case LOGIN:
            return {
                isAuthenticated: true,
                user: action.payload
            };
        case LOGOUT:
            return {
                isAuthenticated: false,
                user: null
            };
        default:
            return state;
    }
}

// Authenticated user action
import { LOGIN, LOGOUT } from './ActionTypes.js';

export const login = (user) => {
    return {
        type: LOGIN,
        payload: user
    };
}

export const logout = () => {
    return {
        type: LOGOUT
    };
}