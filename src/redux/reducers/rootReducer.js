// reducers/index.js

import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import themeReducer from './themeReducer';
const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    themeMode: themeReducer
});

export default rootReducer;
