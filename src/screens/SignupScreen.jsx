import React from "react";
import { Button, withTheme } from "react-native-elements";
import { StyleSheet } from "react-native";
import { Screen, CustomText } from "../components";

const SignupScreen = ({ navigation }) => {
  return (
    <Screen>
      <CustomText h2 fontWeight="bold">Let's Start!</CustomText>
      <Button onPress={() => navigation.navigate("Login")} title="Login" />
    </Screen>
  );
};

const styles = StyleSheet.create({});

export default withTheme(SignupScreen);
