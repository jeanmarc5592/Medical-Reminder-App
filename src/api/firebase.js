import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";

export const signUserUp = async (email, password, name) => {
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
  }
};

export const signUserIn = async (email, password) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } 
  catch (err) {
    console.log(err.message);
    Alert.alert("Email or Password is wrong");
  }
};

export const signUserOut = async () => {
  try {
    await firebase.auth().signOut();
  } 
  catch (err) {
    console.log(err.message);
    Alert.alert("Something went wrong");
  }
};


export const getUser = async (onSuccessHandler = () => {}, onErrorHandler = () => {}) => {
  try {
    const currentUser = firebase.auth().currentUser;
    const db = firebase.firestore();
    const currentUserData  = await db.collection("users").doc(currentUser.uid).get();
    if (currentUserData.exists) {
      return onSuccessHandler(currentUserData.data());
    }
    throw new Error();
  } catch (error) {
    console.log(error);
    onErrorHandler();
  }
}; 

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