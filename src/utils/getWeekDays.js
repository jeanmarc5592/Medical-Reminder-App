import { addDays, format, getDate, startOfWeek } from "date-fns"
import uuid from 'react-native-uuid';

/**
 * ********************************************************
 * **** Get the current Weekdays from Monday to Sunday ****
 * ********************************************************
 * @param {Date} date - Current Date Object
 * @returns {Array} - Current Week from Monday to Sunday
 */
export const getWeekDays = (date) => {
    const start = startOfWeek(date, { weekStartsOn: 1 });

    const final = [];

    for (let i = 0; i < 7; i++) {
        const date = addDays(start, i);
        final.push({
            id: uuid.v4(),
            formatted: format(date, "EEE"),
            date,
            day: getDate(date)
        });
    }

    return final;
}