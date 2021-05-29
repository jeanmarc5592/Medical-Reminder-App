import { addDays, format, getDate, startOfWeek } from "date-fns"

export const getWeekDays = (date) => {
    const start = startOfWeek(date, { weekStartsOn: 1 });

    const final = [];

    for (let i = 0; i < 7; i++) {
        const date = addDays(start, i);
        final.push({
            formatted: format(date, "EEE"),
            date,
            day: getDate(date)
        });
    }

    return final;
}