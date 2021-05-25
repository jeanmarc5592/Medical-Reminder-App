import { combineReducers, createStore } from 'redux';
import userReducer from './reducers/user';

const store = createStore(combineReducers({
    user: userReducer
}));

export default store;