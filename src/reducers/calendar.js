import { isToday } from "date-fns/esm";

const initialState = {
    date: new Date(),
};

const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default calendarReducer;
