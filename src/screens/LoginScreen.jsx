import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from 'react-native';
import { Text, Button } from 'react-native-elements';

const LoginScreen = ({ navigation }) => {

    return (
        <SafeAreaView>
            <Text>LOGIN SCREEN</Text>
            <Button onPress={() => navigation.navigate("Signup")} title="Sign Up!" />
        </SafeAreaView>
    )
}

export default LoginScreen;
