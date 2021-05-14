import React from 'react'
import { StyleSheet } from 'react-native';
import { Button, withTheme } from 'react-native-elements';
import { Screen, CustomText } from '../components';

const LoginScreen = ({ navigation }) => {

    return (
        <Screen>
            <CustomText h2 fontWeight="bold">Welcome Back!</CustomText>
            <Button onPress={() => navigation.navigate("Signup")} title="Sign Up!" />
        </Screen>
    )
}

const styles = StyleSheet.create({});

export default withTheme(LoginScreen);
