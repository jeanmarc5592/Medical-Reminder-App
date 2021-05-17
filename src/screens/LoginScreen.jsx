import React from 'react'
import { MaterialIcons } from "@expo/vector-icons";
import { withTheme } from 'react-native-elements';
import { Screen, CustomText, CustomInput, CustomButton } from '../components';

const LoginScreen = ({ navigation, theme }) => {

    return (
        <Screen style={{ alignItems: "center" }}>
            <CustomText h2 fontWeight="bold" style={{ marginTop: 50 }}>
                Welcome Back!
            </CustomText>
            <CustomText style={{ marginTop: 15, fontSize: 18, marginBottom: 80 }}>
                Sign in to your account
            </CustomText>
            <CustomInput 
                leftIcon={<MaterialIcons name="email" size={24} color={theme.text.dark} />} 
                placeholder="Enter your Email" 
            />
            <CustomInput 
                leftIcon={<MaterialIcons name="lock" size={24} color={theme.text.dark} />} 
                placeholder="Enter your Password" 
                secureTextEntry
            />
            <CustomButton onPress={() => console.log("Log in!")} title="Continue" />
        </Screen>
    )
}

export default withTheme(LoginScreen);
