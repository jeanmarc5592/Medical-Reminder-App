/**
 * *****************************************************
 * **** Generates the timezone for a provided month ****
 * *****************************************************
 * @param {Number} month - Current month
 * @returns {String} - Timezone Format for the specific month
 * @throws {String} - Error message if the input month is falsy
 */
export const getGermanUTC = (month) => {
    if (!month) {
        throw new Error("Must provide month!");
    }

    let germanGMT;

    const summerMonths = [4, 5, 6, 7, 8, 9, 10];
    const winterMonths = [11, 12, 1, 2, 3];

    if (summerMonths.includes(month)) {
        germanGMT = "UTC+2";
    } else if (winterMonths.includes(month)) {
        germanGMT = "UTC+1";
    }

    return germanGMT;
}
