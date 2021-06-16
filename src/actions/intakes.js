/**
 * *********************************
 * **** Definition of an Action ****
 * *********************************
 * @typedef {Object} Action
 * @property {String} type - The Action's type
 * @property {Object} payload - The Action's payload
 */



/**
 * *************************************************************
 * **** Sets the provided intake as the current pressed one ****
 * *************************************************************
 * @param {Object} intake - Weekday Object
 * @returns {Action} - Action Object
 */
export const pressOnIntake = intake => ({
  type: "PRESS_ON_INTAKE",
  payload: intake,
});



/**
 * *********************************************************
 * **** Sets the provided intake as the last edited one ****
 * *********************************************************
 * @param {Object} intake - Weekday Object
 * @returns {Action} - Action Object
 */
export const editIntake = intake => ({
  type: "EDIT_INTAKE",
  payload: intake,
});



/**
 * ***********************************************
 * **** Sets the individual intakes for today ****
 * ***********************************************
 * @param {Array} intakesForToday - Pre-filtered Intakes for today
 * @returns {Action} - Action Object
 */
export const setIntakesForToday = intakesForToday => ({
  type: "SET_INTAKES_FOR_TODAY",
  payload: intakesForToday,
});
