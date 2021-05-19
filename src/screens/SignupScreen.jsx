import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { View, TouchableOpacity, Alert } from 'react-native';
import { withTheme } from "react-native-elements";
import { signUserUp } from '../api/firebase';
import { Screen, CustomText, CustomInput, CustomButton } from "../components";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmedPassword: ""
}

const SignupScreen = ({ navigation, theme }) => {
  const [formState, setFormState] = useState(initialState);

  const handleSignUp = () => {
    if (!formState.name) {
      Alert.alert("Your Name is required");
    } else if (!formState.email) {
      Alert.alert("Your Email is required");
    } else if (!formState.password) {
      Alert.alert("Your Password is required");
    } else if (!formState.confirmedPassword) {
      Alert.alert("You must confirm your password");
    } else if (formState.password !== formState.confirmedPassword) {
      Alert.alert("Your passwords need to match")
    } else {
      signUserUp(formState.email, formState.password, formState.name);
      setFormState(initialState)
    }
  };

  return (
    <Screen style={{ alignItems: "center" }}>
      <CustomText h2 fontWeight="bold" style={{ marginTop: 50 }}>
        Let's start!
      </CustomText>
      <CustomText style={{ marginTop: 15, fontSize: 18, marginBottom: 50 }}>Sign up for a free account</CustomText>
      <CustomInput
        leftIcon={<FontAwesome name="user" size={24} color={theme.text.dark} />}
        placeholder="Your Name"
        onChangeText={(name) => setFormState({ ...formState, name })}
        value={formState.name}
        autoCorrect={false}
      />
      <CustomInput
        leftIcon={<MaterialIcons name="email" size={24} color={theme.text.dark} />}
        placeholder="Your Email"
        onChangeText={(email) => setFormState({ ...formState, email })}
        value={formState.email}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <CustomInput
        leftIcon={<MaterialIcons name="lock" size={24} color={theme.text.dark} />}
        placeholder="Your Password"
        onChangeText={(password) => setFormState({ ...formState, password })}
        value={formState.password}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
      />
      <CustomInput
        leftIcon={<MaterialIcons name="lock" size={24} color={theme.text.dark} />}
        placeholder="Confirm Password"
        onChangeText={(confirmedPassword) => setFormState({ ...formState, confirmedPassword })}
        value={formState.confirmedPassword}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
      />
      <CustomButton onPress={handleSignUp} title="Sign up" />
      <View style={{ display: "flex", flexDirection: "row", marginTop: 40 }}>
        <CustomText>Already have an account?&nbsp;</CustomText>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <CustomText style={{ textDecorationLine: "underline" }} fontWeight="bold">
            Log In!
          </CustomText>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

export default withTheme(SignupScreen);
