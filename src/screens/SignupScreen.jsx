import React from "react";
import { Text, Button } from "react-native-elements";
import { StyleSheet } from "react-native";
import { Screen } from "../components";

const SignupScreen = ({ navigation }) => {
  return (
    <Screen>
      <Text>SIGNUP SCREEN</Text>
      <Button onPress={() => navigation.navigate("Login")} title="Login" />
    </Screen>
  );
};

const styles = StyleSheet.create({});

export default SignupScreen;
