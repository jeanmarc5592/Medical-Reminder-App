import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { withTheme } from "react-native-elements";
import { TouchableOpacity, View, Alert, StyleSheet } from "react-native";
import { signUserIn } from '../api/firebase';
import { Screen, CustomText, CustomInput, CustomButton } from "../components";

const initialState = {
  email: "",
  password: ""
};

const LoginScreen = ({ navigation, theme }) => {
  const [formState, setFormState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (!formState.email) {
        Alert.alert("Your Email is required");
        setIsLoading(false);
      } else if (!formState.password) {
        Alert.alert("Your Password is required");
        setIsLoading(false);
      } else {
        signUserIn(formState.email, formState.password, setIsLoading(false));
      }
    }, 2000);
  };

  return (
    <Screen style={{ alignItems: "center" }}>
      <CustomText h2 fontWeight="bold" style={{ marginTop: 50 }}>
        Welcome Back!
      </CustomText>
      <CustomText style={styles.subTitle}>Sign in to your account</CustomText>
      <CustomInput
        onChangeText={(email) => setFormState({ ...formState, email })}
        value={formState.email}
        leftIcon={<MaterialIcons name="email" size={24} color={theme.text.dark} />}
        placeholder="Enter your Email"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <CustomInput
        onChangeText={(password) => setFormState({ ...formState, password })}
        value={formState.password}
        leftIcon={<MaterialIcons name="lock" size={24} color={theme.text.dark} />}
        placeholder="Enter your Password"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
      />
      <CustomButton loading={isLoading} containerStyle={styles.signInButton} onPress={handleSignIn} title="Continue" />
      <View style={styles.signUpContainer}>
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

const styles = StyleSheet.create({
    subTitle: {
      marginTop: 15,
      fontSize: 18,
      marginBottom: 80,
    },
    signInButton: {
      marginBottom: 15,
      marginTop: 30,
    },
    signUpContainer: {
      display: "flex",
      flexDirection: "row",
      marginTop: 40,
    },
  });

export default withTheme(LoginScreen);