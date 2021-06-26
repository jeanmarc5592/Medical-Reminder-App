import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { View, TouchableOpacity, Alert, StyleSheet } from 'react-native';
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
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (!formState.name) {
        Alert.alert("Your Name is required");
        setIsLoading(false);
      } else if (!formState.email) {
        Alert.alert("Your Email is required");
        setIsLoading(false);
      } else if (!formState.password) {
        Alert.alert("Your Password is required");
        setIsLoading(false);
      } else if (!formState.confirmedPassword) {
        Alert.alert("You must confirm your password");
        setIsLoading(false);
      } else if (formState.password !== formState.confirmedPassword) {
        Alert.alert("Your passwords need to match");
        setIsLoading(false);
      } else {
        signUserUp(formState.email, formState.password, formState.name, setIsLoading(false));
      }
    }, 2000);
  };

  return (
    <Screen style={{ alignItems: "center" }}>
      <CustomText h2 fontWeight="bold" style={{ marginTop: 50 }}>
        Let's start!
      </CustomText>
      <CustomText style={styles.subTitle}>Sign up for a free account</CustomText>
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
      <CustomButton loading={isLoading} onPress={handleSignUp} title="Sign up" />
      <View style={styles.signInContainer}>
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

const styles = StyleSheet.create({
    subTitle: {
      marginTop: 15,
      fontSize: 18,
      marginBottom: 50,
    },
    signInContainer: {
      display: "flex",
      flexDirection: "row",
      marginTop: 40,
    },
  });

export default withTheme(SignupScreen);
