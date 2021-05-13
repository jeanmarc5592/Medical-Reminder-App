import React from 'react'
import { StyleSheet } from 'react-native';
import { Text, Button, withTheme } from 'react-native-elements';
import { Screen } from '../components';

const LoginScreen = ({ navigation }) => {

    return (
        <Screen>
            <Text>LOGIN SCREEN</Text>
            <Button onPress={() => navigation.navigate("Signup")} title="Sign Up!" />
        </Screen>
    )
}

const styles = StyleSheet.create({});

export default withTheme(LoginScreen);
