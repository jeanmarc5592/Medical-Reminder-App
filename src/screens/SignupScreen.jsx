import React from "react";
import { Button, withTheme } from "react-native-elements";
import { Screen, CustomText } from "../components";

const SignupScreen = ({ navigation }) => {
  return (
    <Screen style={{ alignItems: "center" }}>
      <CustomText h2 fontWeight="bold" style={{ marginTop: 35 }}>
        Let's start!
      </CustomText>
      <CustomText style={{ marginTop: 15, fontSize: 18, marginBottom: 35 }}>
        Sign up for a free account
      </CustomText>
      <Button onPress={() => navigation.navigate("Login")} title="Log In!" />
    </Screen>
  );
};

export default withTheme(SignupScreen);
