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
    });
  } 
  catch (err) {
    console.log(err.message);
    Alert.alert("There is something wrong!!!!");
  }
};

export const signUserIn = async (email, password) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } 
  catch (err) {
    console.log(err.message);
    Alert.alert("There is something wrong!");
  }
};

export const signUserOut = async () => {
  try {
    await firebase.auth().signOut();
  } 
  catch (err) {
    console.log(err.message);
    Alert.alert("There is something wrong!");
  }
};
