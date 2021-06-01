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