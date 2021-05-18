import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { withTheme } from "react-native-elements";
import { TouchableOpacity, View } from "react-native";
import { Screen, CustomText, CustomInput, CustomButton } from "../components";

const LoginScreen = ({ navigation, theme }) => {
  return (
    <Screen style={{ alignItems: "center" }}>
      <CustomText h2 fontWeight="bold" style={{ marginTop: 50 }}>
        Welcome Back!
      </CustomText>
      <CustomText style={{ marginTop: 15, fontSize: 18, marginBottom: 80 }}>Sign in to your account</CustomText>
      <CustomInput leftIcon={<MaterialIcons name="email" size={24} color={theme.text.dark} />} placeholder="Enter your Email" />
      <CustomInput leftIcon={<MaterialIcons name="lock" size={24} color={theme.text.dark} />} placeholder="Enter your Password" secureTextEntry />
      <CustomButton containerStyle={{ marginBottom: 15, marginTop: 30 }} onPress={() => console.log("Log in!")} title="Continue" />
      <View style={{ display: "flex", flexDirection: "row", marginTop: 40 }}>
        <CustomText>Don't have an account?&nbsp;</CustomText>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <CustomText style={{ textDecorationLine: "underline" }} fontWeight="bold">
            Sign up!
          </CustomText>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

export default withTheme(LoginScreen);
