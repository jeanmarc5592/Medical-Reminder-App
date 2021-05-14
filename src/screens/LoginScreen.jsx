import React from 'react'
import { Button } from 'react-native-elements';
import { Screen, CustomText } from '../components';

const LoginScreen = ({ navigation }) => {

    return (
        <Screen style={{ alignItems: "center" }}>
            <CustomText h2 fontWeight="bold" style={{ marginTop: 35 }}>
                Welcome Back!
            </CustomText>
            <CustomText style={{ marginTop: 15, fontSize: 18, marginBottom: 35 }}>
                Sign in to your account
            </CustomText>
            <Button onPress={() => navigation.navigate("Signup")} title="Sign Up!" />
        </Screen>
    )
}

export default LoginScreen;
