/**
 * *********************************
 * **** Definition of an Action ****
 * *********************************
 * @typedef {Object} Action
 * @property {String} type - The Action's type
 * @property {Object} payload - The Action's payload 
 */



/**
 * ***************************************************************
 * **** Sets the provided Weekday as the current selected one ****
 * ***************************************************************
 * @param {Object} weekDay - Weekday Object 
 * @returns {Action} - Action Object  
 */
export const setSelectedDay = weekDay => ({
    type: "SET_SELECTED_DAY",
    payload: weekDay
});