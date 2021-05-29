import { combineReducers, createStore } from 'redux';
import userReducer from './reducers/user';
import calendarReducer from './reducers/calendar';

const store = createStore(combineReducers({
    user: userReducer,
    calendar: calendarReducer
}));

export default store;