import { combineReducers, createStore } from 'redux';
import userReducer from './reducers/user';
import calendarReducer from './reducers/calendar';
import intakesReducer from './reducers/intakes';

const store = createStore(combineReducers({
    user: userReducer,
    calendar: calendarReducer,
    intakes: intakesReducer
}));

export default store;