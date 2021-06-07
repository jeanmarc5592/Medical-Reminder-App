/**
 * *********************************
 * **** Definition of an Action ****
 * *********************************
 * @typedef {Object} Action
 * @property {String} type - The Action's type
 * @property {Object|String} payload - The Action's payload
 */



/**
 * *******************************************
 * **** Sets the Data of the current User ****
 * *******************************************
 * @param {Object} userData - User Data Object from Firestore
 * @returns {Action} - Action Object
 */
export const setUserData = userData => ({
  type: "SET_USER_DATA",
  payload: userData,
});



/**
 * ************************************************
 * **** Sets the id of the last taken medicine ****
 * ************************************************
 * @param {String} medicineId - Id of the taken medicine
 * @returns {Action} - Action Object
 */
export const takeNewMedicine = medicineId => ({
  type: "TAKE_NEW_MEDICINE",
  payload: medicineId,
});
