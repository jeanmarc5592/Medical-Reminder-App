// TODO: Add Docs

export const getWeekdayNumber = (weekdayString = "") => {
    if (!weekdayString) {
        throw new Error("Must provide a valid weekday String!");
    }

    switch (weekdayString) {
      case "Sun":
        return 1;
      case "Mon":
        return 2;
      case "Tue":
        return 3;
      case "Wed":
        return 4;
      case "Thu":
        return 5;
      case "Fri":
        return 6;
      case "Sat":
        return 7;
      default:
        return;
    }
};