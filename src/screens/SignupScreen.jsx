import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { Text, Button } from "react-native-elements";

const SignupScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Text>SIGNUP SCREEN</Text>
      <Button onPress={() => navigation.navigate("Login")} title="Login" />
    </SafeAreaView>
  );
};

export default SignupScreen;
