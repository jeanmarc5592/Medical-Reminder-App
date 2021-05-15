import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Button, withTheme } from "react-native-elements";
import { Screen, CustomText, CustomInput } from "../components";

const SignupScreen = ({ navigation, theme }) => {
  return (
    <Screen style={{ alignItems: "center" }}>
      <CustomText h2 fontWeight="bold" style={{ marginTop: 50 }}>
        Let's start!
      </CustomText>
      <CustomText style={{ marginTop: 15, fontSize: 18, marginBottom: 80 }}>
        Sign up for a free account
      </CustomText>
      <CustomInput 
        leftIcon={<FontAwesome name="user" size={24} color={theme.text.dark} />} 
        placeholder="Your Name"
      />
      <CustomInput 
        leftIcon={<MaterialIcons name="email" size={24} color={theme.text.dark} />} 
        placeholder="Your Email"
      />
      <CustomInput 
        leftIcon={<MaterialIcons name="lock" size={24} color={theme.text.dark} />} 
        placeholder="Your Password" 
        secureTextEntry
      />
      <CustomInput 
        leftIcon={<MaterialIcons name="lock" size={24} color={theme.text.dark} />} 
        placeholder="Repeat your Password" 
        secureTextEntry
      />
      <Button onPress={() => navigation.navigate("Login")} title="Log In!" />
    </Screen>
  );
};

export default withTheme(SignupScreen);
