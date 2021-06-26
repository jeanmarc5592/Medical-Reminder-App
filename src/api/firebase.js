import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";

/**
 * ***************************
 * **** Signs the user UP ****
 * ***************************
 * @param {String} email - User's email adress
 * @param {String} password - User's password
 * @param {String} name - User's name
 * @param {Function} onErrorHandler - Function that runs when something went wrong signing the user up
 * @returns {Void} - Nothing
 * @throws {String} - Error message if something went wrong with signing the user up
 */
export const signUserUp = async (email = "", password = "", name = "", onErrorHandler = () => {}) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;

    const db = firebase.firestore();
    db.collection("users").doc(currentUser.uid).set({
      email: currentUser.email,
      name,
      reminders: []
    });
  } 
  catch (err) {
    console.log(err.message);
    Alert.alert("An error occured or the Email is already registered");
    onErrorHandler();
  }
};


/**
 * ***************************
 * **** Signs the user IN ****
 * ***************************
 * @param {String} email - User's email adress
 * @param {String} password - User's password
 * @param {Function} onErrorHandler - Function that runs when something went wrong signing the user in
 * @returns {Void} - Nothing
 * @throws {String} - Error message if something went wrong signing the user in
 */
export const signUserIn = async (email = "", password = "", onErrorHandler = () => {}) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } 
  catch (err) {
    console.log(err.message);
    Alert.alert("Email or Password is wrong");
    onErrorHandler();
  }
};



/**
 * ****************************
 * **** Signs the user OUT ****
 * ****************************
 * @param {Void}
 * @returns {Void}
 * @throws {String} - Error message if something went wrong signing the user out
 */
export const signUserOut = async () => {
  try {
    await firebase.auth().signOut();
  } 
  catch (err) {
    console.log(err.message);
    Alert.alert("Something went wrong");
  }
};



/**
 * ************************************************
 * **** Fetches the user's data from firestore ****
 * ************************************************
 * @param {Function} onSuccessHandler - Function that runs when the user's data got fetched successfully
 * @param {Function} onErrorHandler - Function that runs when something went wrong fetching the user's data
 * @returns {Object} - User Data from Firestore
 * @throws {String} - Error message if something went wrong fetching the user's data
 */
export const getUser = async (onSuccessHandler = () => {}, onErrorHandler = () => {}) => {
  try {
    const currentUser = firebase.auth().currentUser;
    const db = firebase.firestore();
    const currentUserData  = await db.collection("users").doc(currentUser.uid).get();
    if (currentUserData.exists) {
      // User Data will be passed as an argument to access it in the handler function
      return onSuccessHandler(currentUserData.data());
    }
    throw new Error();
  } catch (error) {
    console.log(error);
    onErrorHandler();
  }
}; 


/**
 * **************************************
 * **** Takes an individual medicine ****
 * **************************************
 * @param {Date} date - Current Date Object
 * @param {String} intakeId - Id of the individual Intake
 * @param {Function} onSuccessHandler - Function that runs when the medicine got taken successfully
 * @param {Function} onErrorHandler - Function that runs when something went wrong taking the medicine
 * @returns {Void} - Nothing
 * @throws {String} - Error message if something went wrong taking the medicine
 */
export const takeMedicine = async (date = new Date(), intakeId = "", onSuccessHandler = () => {}, onErrorHandler = () => {}) => {
  try {
    const currentUser = firebase.auth().currentUser;
    const db = firebase.firestore();
    
    // Get reminders array for the particular user
    let dbUser = await db.collection("users").doc(currentUser.uid).get();
    dbUser = dbUser.data();
    const { reminders } = dbUser;
    
    // Find the individual intake by it's id and add the current date
    let updatedIntakeIndex = 0;
    const updatedIntake = reminders.find((reminder, index) => {
      if (reminder.id === intakeId) {
        updatedIntakeIndex = index;
        return reminder;
      }
    });
    const isAlreadyTaken = updatedIntake.takenOn.find(takenDate => takenDate === date);
    if (!isAlreadyTaken) {
      updatedIntake.takenOn = [...updatedIntake.takenOn, date];
    }
    reminders[updatedIntakeIndex] = updatedIntake;

    // Update document with the updated reminders array
    await db.collection("users").doc(currentUser.uid).update({ reminders });

    onSuccessHandler();
  } catch (error) {
    console.log(error);
    onErrorHandler();
  }
}


/**
 * **************************************
 * **** Edits an individual medicine ****
 * **************************************
 * @param {Object} editedMedicine - Edited Medicine
 * @param {Function} onSuccessHandler - Function that runs when the medicine got edited successfully
 * @param {Function} onErrorHandler - Function that runs when something went wrong editing the medicine
 * @returns {Void} - Nothing
 * @throws {String} - Error message if something went wrong editing the medicine
 */
export const editMedicine = async (editedMedicine = {}, onSuccessHandler = () => {}, onErrorHandler = () => {}) => {
  try {
    const currentUser = firebase.auth().currentUser;
    const db = firebase.firestore();

    // Get reminders array for the particular user
    let dbUser = await db.collection("users").doc(currentUser.uid).get();
    dbUser = dbUser.data();
    const { reminders } = dbUser;

    // Find the individual intake by it's id and add the current date
    let updatedIntakeIndex = 0;
    reminders.find((reminder, index) => {
      if (reminder.id === editedMedicine.id) {
        updatedIntakeIndex = index;
      }
    });
    reminders[updatedIntakeIndex] = editedMedicine;

    // Update document with the updated reminders array
    await db.collection("users").doc(currentUser.uid).update({ reminders });

    onSuccessHandler();
  } catch (error) {
    console.log(error);
    onErrorHandler();
  }
}


/**
 * ****************************************
 * **** Deletes an individual medicine ****
 * ****************************************
 * @param {String} id - Id of the medicine that should be deleted
 * @param {Function} onSuccessHandler - Function that runs when the medicine got deleted successfully
 * @param {Function} onErrorHandler - Function that runs when something went wrong deleting the medicine
 * @returns {Void} - Nothing
 * @throws {String} - Error message if something went wrong deleting the medicine
 */
export const deleteMedicine = async (id = "", onSuccessHandler = () => {}, onErrorHandler = () => {}) => {
  try {
    const currentUser = firebase.auth().currentUser;
    const db = firebase.firestore();

    // Get reminders array for the particular user
    let dbUser = await db.collection("users").doc(currentUser.uid).get();
    dbUser = dbUser.data();
    const { reminders } = dbUser;

    // Filter the reminder with the provided ID out
    const updatedReminders = reminders.filter(reminder => reminder.id !== id);

    // Update document with the updated reminders array
    await db.collection("users").doc(currentUser.uid).update({ reminders: updatedReminders });

    onSuccessHandler();
  } catch (error) {
    console.log(error);
    onErrorHandler();
  }
}


/**
 * *****************************
 * **** Adds a new medicine ****
 * *****************************
 * @param {Object} newMedicine - New Medicine that should be added to the User's reminders Array
 * @param {Function} onSuccessHandler - Function that runs when the medicine got added successfully
 * @param {Function} onErrorHandler - Function that runs when something went wrong adding the medicine
 * @returns {Void} - Nothing
 * @throws {String} - Error message if something went wrong adding the medicine
 */
export const addMedicine = async (newMedicine = {}, onSuccessHandler = () => {}, onErrorHandler = () => {}) => {
  try {
    const currentUser = firebase.auth().currentUser;
    const db = firebase.firestore();

    // Get reminders array for the particular user
    let dbUser = await db.collection("users").doc(currentUser.uid).get();
    dbUser = dbUser.data();
    const { reminders } = dbUser;

    // Add payload object (new medicine) to reminders Array
    const updatedReminders = reminders.concat(newMedicine);

    // Update document with the updated reminders array
    await db.collection("users").doc(currentUser.uid).update({ reminders: updatedReminders });

    onSuccessHandler();
  } catch (error) {
    console.log(error);
    onErrorHandler();
  }
}